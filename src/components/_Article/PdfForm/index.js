import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hubspot';
import SectionObserver from '@components/SectionObserver';
import RichText from '@components/RichText';
import PropTypes from 'prop-types';
import axios from 'axios';
import * as classes from './index.module.css';

const PdfForm = ({ data }) => {
  const {
    formId,
    portalId = '25832621',
    formattedTitle,
    buttonTitle = 'Download now',
    thanksMessage = "Thanks for sliding into our DM's",
    downloadButtonTitle = 'Read it Now',
  } = data;

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    company: '',
    jobtitle: '',
  });
  const [canSend, setCanSend] = useState(false);
  const [customState, setCustomState] = useState(null);
  const [pdfUrlLink, setPdfUrlLink] = useState(null);
  const [pdfUrlName, setPdfUrlName] = useState(null);
  const [confirmState, setConfirmState] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [loading, setLoading] = useState(false);

  const downloadButton = useRef(null);
  const formRef = useRef(null);

  const { data: hubspotData, isLoading, isError, handleSubmit } = useForm({
    portalId,
    formId,
  });

  // --- Watch Hubspot response ---
  useEffect(() => {
    if (hubspotData?.data?.redirectUri) {
      fetchData(hubspotData.data.redirectUri);
    } else if (hubspotData?.data?.inlineMessage) {
      setCustomState(
        <div dangerouslySetInnerHTML={{ __html: hubspotData.data.inlineMessage }} />
      );
    }
  }, [hubspotData]);

  // --- Trigger auto-download when ready ---
  useEffect(() => {
    if (confirmState && downloadButton.current) {
      downloadButton.current.click();
    }
  }, [confirmState]);

  // --- Cleanup blob URLs ---
  useEffect(() => {
    return () => {
      if (pdfUrlLink) window.URL.revokeObjectURL(pdfUrlLink);
    };
  }, [pdfUrlLink]);

  // --- Email validation helper ---
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // --- Validate form whenever inputs change ---
  useEffect(() => {
    const { firstname, lastname, email, company, jobtitle } = formData;
    const valid =
      firstname.trim() &&
      lastname.trim() &&
      company.trim() &&
      jobtitle.trim() &&
      email.trim() &&
      isValidEmail(email);
    setCanSend(Boolean(valid));
  }, [formData]);

  // --- Handle input changes ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setShowThanks(false);
  };

  // --- Clear all inputs ---
  const clearFormInputs = () => {
    setFormData({
      firstname: '',
      lastname: '',
      email: '',
      company: '',
      jobtitle: '',
    });
    if (formRef.current) formRef.current.reset();
  };

  // --- Handle submit ---
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!canSend) return; // extra guard
    setLoading(true);
    await handleSubmit(e); // trigger HubSpot
    clearFormInputs();
    setLoading(false);
  };

  // --- File download handler ---
  const pdfDownload = (blob, file) => {
    const filename = file.replace(/^.*[\\/]/, '');
    const url = window.URL.createObjectURL(
      new Blob([blob], { type: 'application/pdf' })
    );
    setPdfUrlLink(url || file);
    setPdfUrlName(filename);
    setCustomState(null);
    setConfirmState(true);
    setShowThanks(true);
  };

  // --- Fetch file from HubSpot redirectUri ---
  const fetchData = async (file) => {
    setCustomState('Loading...');
    setShowThanks(false);
    try {
      const result = await axios.get(file.toString(), {
        responseType: 'blob',
        onDownloadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setCustomState(`Downloading... ${percentage}%`);
          } else {
            setCustomState(
              `Downloading... ${Math.round(progressEvent.loaded / 1024)} KB`
            );
          }
        },
      });
      pdfDownload(result.data, file);
    } catch (e) {
      console.error('Download error:', e);
      setCustomState('Download failed. Please try again.');
    }
  };

  return (
    <SectionObserver className={classes.root}>
      <div className={classes.cont}>
        {/* --- TITLE --- */}
        <div className={classes.titleContainer}>
          <RichText
            content={formattedTitle}
            className={classes.title}
            useHeadings="Heading 2"
          />
        </div>

        {/* --- FORM --- */}
        <form
          ref={formRef}
          onSubmit={handleFormSubmit}
          className={classes.form}
        >
          <div className={classes.control}>
            <input
              type="text"
              name="firstname"
              placeholder="First name*"
              value={formData.firstname}
              onChange={handleChange}
              required
              className={classes.input}
            />
          </div>
          <div className={classes.control}>
            <input
              type="text"
              name="lastname"
              placeholder="Last name*"
              value={formData.lastname}
              onChange={handleChange}
              required
              className={classes.input}
            />
          </div>
          <div className={classes.control}>
            <input
              type="email"
              name="email"
              placeholder="Email*"
              value={formData.email}
              onChange={handleChange}
              required
              className={classes.input}
            />
          </div>
          <div className={classes.control}>
            <input
              type="text"
              name="company"
              placeholder="Company*"
              value={formData.company}
              onChange={handleChange}
              required
              className={classes.input}
            />
          </div>
          <div className={classes.control}>
            <input
              type="text"
              name="jobtitle"
              placeholder="Job Title*"
              value={formData.jobtitle}
              onChange={handleChange}
              required
              className={classes.input}
            />
          </div>

          <button
            type="submit"
            disabled={!canSend || loading || isLoading}
            className={classes.submitBtn}
          >
            {loading || isLoading ? 'Submitting...' : buttonTitle}
          </button>
        </form>

        {/* --- STATUS + THANKS MESSAGE --- */}
        <div className={classes.feedback}>
          {isError && (
            <p className={classes.error}>Something went wrong. Try again.</p>
          )}

          {customState && <p className={classes.loadingText}>{customState}</p>}

          {showThanks && (
            <div className={classes.thanksMessage}>
              <RichText content={thanksMessage} />
              {confirmState && (
                <>
                  <p className={classes.infoText}>
                    Your download should begin automatically. or{' '}
                    <a
                      ref={downloadButton}
                      href={pdfUrlLink}
                      download={pdfUrlName}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={classes.downloadButton}
                    >
                      {downloadButtonTitle}
                    </a>
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </SectionObserver>
  );
};

PdfForm.propTypes = {
  data: PropTypes.object
};

export default PdfForm;
