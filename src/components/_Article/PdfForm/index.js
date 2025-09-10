import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hubspot';
import SectionObserver from '@components/SectionObserver';
import RichText from '@components/RichText';
import PropTypes from 'prop-types';
import axios from 'axios';
import * as classes from './index.module.css';
import CheckIcon from '@Svg/check-square.svg'

const PdfForm = ({ data }) => {
  const {
    formId,
    portalId = '25832621',
    formattedTitle,
    buttonTitle = "Download now",
    thanksMessage = "Thanks for sliding into our DM's",
    agreementCheckboxLabel = "I agree to the Terms & Conditions and Privacy Policy",
    downloadButtonTitle = "Read Now"
  } = data;

  const [submitted, setSubmitted] = useState(false);
  const [customState, setCustomState] = useState(null);
  const [pdfUrlLink, setPdfUrlLink] = useState();
  const [pdfUrlName, setPdfUrlName] = useState();
  const [confirmState, setConfirmState] = useState(false);

  const downloadButton = useRef(null);

  const { data: hubspotData, isLoading, isError, handleSubmit } = useForm({
    portalId,
    formId
  });

  useEffect(() => {
    if (hubspotData?.data?.redirectUri) {
      fetchData(hubspotData.data.redirectUri);
    } else if (hubspotData?.data?.inlineMessage) {
      setCustomState(
        <div dangerouslySetInnerHTML={{ __html: hubspotData.data.inlineMessage }} />
      );
    }
  }, [hubspotData]);

  const handleClick = () => {
    downloadButton.current.click();
  };

  const pdfDownload = (blob, file) => {
    const filename = file.replace(/^.*[\\/]/, '');
    const url = window.URL.createObjectURL(
      new Blob([blob], { type: 'application/pdf' })
    );
    setPdfUrlLink(url || file);
    setPdfUrlName(filename);
    handleClick();
    setConfirmState(true);
    setCustomState('hide');
    setSubmitted(true);
  };

  const fetchData = async (file) => {
    setCustomState('Loading...');
    try {
      const result = await axios.get(file.toString(), {
        responseType: 'blob',
        onDownloadProgress: (progressEvent) => {
          const percentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setCustomState('Loading - ' + percentage + '%');
        }
      });
      pdfDownload(result.data, file);
    } catch (e) {
      console.error('Download error:', e);
    }
  };

  return (
    <SectionObserver className={classes.root}>
      <div className={classes.cont}>
        <div className={classes.titleContainer}>
          <RichText
            content={formattedTitle}
            className={classes.title}
            useHeadings="Heading 2"
          />
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className={classes.form}>
            <div className={classes.control}>
              <input type="text" name="firstname" placeholder="First name*" required className={classes.input} />
            </div>
            <div className={classes.control}>
              <input type="text" name="lastname" placeholder="Last name*" required className={classes.input} />
            </div>
            <div className={classes.control}>
              <input type="email" name="email" placeholder="Email*" required className={classes.input}/>
            </div>
            <div className={classes.control}>
              <input type="text" name="company" placeholder="Company*" required className={classes.input}/>
            </div>
            <div className={classes.control}>
              <input type="text" name="jobtitle" placeholder="Job Title*" required className={classes.input}/>
            </div>
            <div className={classes.control}>
              <input
                type="checkbox"
                name="yes__i_do__i_agree_to_the_terms___conditions_and_privacy_policy_"
                required
                className={classes.checkbox}
              />
              <label className={classes.checkboxLabel}>
                <CheckIcon className={classes.checkIcon}/>{agreementCheckboxLabel}
              </label>
            </div>
            
            <button type="submit" disabled={isLoading} className={classes.submitBtn}>
              {isLoading ? 'Submitting...' : buttonTitle}
            </button>
          </form>
        ) : (
          <>
            <div className={classes.thanksMessage}>{thanksMessage}</div>
            {confirmState && (
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
            )}
          </>
        )}

        {isError && <p className={classes.error}>Something went wrong.</p>}
        {customState && customState !== 'hide' && <div>{customState}</div>}
      </div>
    </SectionObserver>
  );
};

PdfForm.propTypes = {
  data: PropTypes.shape({
    formId: PropTypes.string,
    portalId: PropTypes.string,
    formattedTitle: PropTypes.object,
    buttonTitle: PropTypes.string,
    thanksMessage: PropTypes.string,
    agreementCheckboxLabel: PropTypes.string,
    downloadButtonTitle: PropTypes.string
  })
};

export default PdfForm;
