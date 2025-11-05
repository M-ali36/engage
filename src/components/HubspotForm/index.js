import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hubspot';
import { allReasons, allSites } from './data';
import * as classes from './index.module.css'
import PropTypes from 'prop-types';
import Arrow from '@Svg/caret.svg'

const HubspotForm = ({ formInfoText }) => {
	const [submitted, setSubmitted] = useState(false);
	const [canSend, setCanSend] = useState(false);
	const [slideOpened, setSlideOpened] = useState(true);
	const [loading, setLoading] = useState();
	const formRef = useRef();
	const mainSection = useRef();

	const formId = '0053c51b-b881-4959-a7eb-bfc2c378f3af';
	const successMessage = `Thanks for sliding into our DM's`;

	const { data, isLoading, handleSubmit } = useForm({
		portalId: '25832621',
		formId,
	});

	const initialFormData = {
		firstname: '',
		lastname: '',
		company: '',
		jobtitle: '',
		email: '',
		enquiry_type:'',
		where_did_you_hear_about_us_: '',
		your_message: '',
		hs_persona: ''
	};

	const [formData, setFormData] = useState(initialFormData);

	// Clear native form fields when we mark as submitted
	useEffect(() => {
		if (submitted && formRef.current) {
			formRef.current.reset();
		}
	}, [submitted]);

	// On successful HubSpot response: keep form open, clear fields, show success
	useEffect(() => {
		if (data?.data) {
			setSubmitted(true);
			setFormData(initialFormData);
			if (formRef.current) {
				formRef.current.reset();
			}
		}
	}, [data]);

	useEffect(() => {
		setLoading(isLoading);
	}, [isLoading]);

	useEffect(() => {
		setFormData(initialFormData);
	}, []);

	useEffect(() => {
		setCanSend(validateForm());
	}, [formData]);

	const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

	const validateForm = () => {
		const { firstname, lastname, email } = formData;
		return (
			firstname.trim() &&
			lastname.trim() &&
			email.trim() &&
			isValidEmail(email)
		);
	};

	const handleChange = (e) => {
		const { id, value } = e.target;
		setFormData((prev) => ({ ...prev, [id]: value }));
		if (submitted) setSubmitted(false);
	};

	const handleSelectChange = (e) => {
		const { id, value } = e.target;
		setFormData((prev) => ({ ...prev, [id]: value }));
		if (submitted) setSubmitted(false);
	};

	const sendAnother = () => {
		setSlideOpened(true);
		setSubmitted(false);
		setFormData(initialFormData);
		if (formRef.current) formRef.current.reset();
	};

	return (
		<section ref={mainSection} id="contact-form" className={classes.root}>
			<form onSubmit={handleSubmit} ref={formRef}>
				<div id="formInputs" className={classes.row}>
					{/* First Name */}
					<div className={`${classes.control} ${classes.required}`}>
						<input
							id="firstname"
							name="firstname"
							type="text"
							value={formData.firstname}
							onChange={handleChange}
							className={classes.input}
							placeholder="First Name*"
							required
						/>
					</div>

					{/* Last Name */}
					<div className={`${classes.control} ${classes.required}`}>
						<input
							id="lastname"
							name="lastname"
							type="text"
							value={formData.lastname}
							onChange={handleChange}
							className={classes.input}
							placeholder="Last Name*"
							required
						/>
					</div>

					{/* Email */}
					<div className={`${classes.control} ${classes.required}`}>
						<input
							id="email"
							name="email"
							type="email"
							value={formData.email}
							onChange={handleChange}
							className={classes.input}
							placeholder="Email*"
							required
						/>
					</div>

					{/* Company */}
					<div className={classes.control}>
						<input
							id="company"
							name="company"
							type="text"
							value={formData.company}
							onChange={handleChange}
							className={classes.input}
							placeholder="Company*"
							required
						/>
					</div>

					{/* Jop Title */}
					<div className={classes.control}>
						<input
							id="jobtitle"
							name="jobtitle"
							type="text"
							value={formData.jobtitle}
							onChange={handleChange}
							className={classes.input}
							placeholder="Job Title*"
							required
						/>
					</div>


					{/* Enquiry Type */}
					<div className={classes.control}>
						<select
							id="enquiry_type"
							name="enquiry_type"
							value={formData.enquiry_type}
							onChange={handleSelectChange}
							className={classes.select}
							required
						>
							<option value="">How can we help?*</option>
							{allReasons.map((opt) => (
								<option key={opt.value} value={opt.value}>
									{opt.label}
								</option>
							))}
						</select>
						<Arrow className={classes.selectArrow} />
					</div>
					
					{/* How did you hear about us? */}
					<div className={classes.control}>
						<select
							id="where_did_you_hear_about_us_"
							name="where_did_you_hear_about_us_"
							value={formData.where_did_you_hear_about_us_}
							onChange={handleSelectChange}
							className={classes.select}
							required
						>
							<option value="">Where did you hear about us?*</option>
							{allSites.map((opt) => (
								<option key={opt.value} value={opt.value}>
									{opt.label}
								</option>
							))}
						</select>
						<Arrow className={classes.selectArrow} />
					</div>

					{/* Message */}
					<div className={classes.control}>
						<textarea
							id="your_message"
							name="your_message"
							rows="8"
							value={formData.your_message}
							onChange={handleChange}
							className={classes.textarea}
							placeholder=""
							required
						/>
					</div>
				</div>

				{/* Submit / Success */}
				<div className={classes.btnContainer}>

					<button type="submit" className={classes.submitBtn} disabled={!canSend || loading}>{loading ? 'Sending...' : 'Send message'}</button>
					{submitted && (
						<p className={classes.success} role="status" aria-live="polite">
							{successMessage}
						</p>
					)}
				</div>
			</form>
		</section>
	);
};

HubspotForm.propTypes = {
	content: PropTypes.object,
};

export default HubspotForm;
