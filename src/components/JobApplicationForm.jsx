import  { useState } from 'react';

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    applyingFor: '',
    relevantExperience: '',
    portfolioUrl: '',
    managementExperience: '',
    additionalSkills: [],
    preferredInterviewTime: ''
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null); // State to store submitted data

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (checked) {
        setFormData((prevData) => ({
          ...prevData,
          additionalSkills: [...prevData.additionalSkills, value]
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          additionalSkills: prevData.additionalSkills.filter(skill => skill !== value)
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      // Form is valid, handle submission (e.g., submit data to API)
      console.log('Submitted:', formData);
      // Store submitted data for display
      setSubmittedData(formData);
      // Clear form data after submission (optional)
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        applyingFor: '',
        relevantExperience: '',
        portfolioUrl: '',
        managementExperience: '',
        additionalSkills: [],
        preferredInterviewTime: ''
      });
      setErrors({});
    } else {
      // Form is invalid, display validation errors
      setErrors(validationErrors);
    }
  };

  const validateForm = (data) => {
    const errors = {};

    // Full Name validation
    if (!data.fullName.trim()) {
      errors.fullName = 'Full Name is required';
    }

    // Email validation
    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(data.email)) {
      errors.email = 'Invalid email format';
    }

    // Phone Number validation
    if (!data.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone Number is required';
    } else if (!isValidPhoneNumber(data.phoneNumber)) {
      errors.phoneNumber = 'Invalid phone number format';
    }

    // Applying For Position validation
    if (!data.applyingFor.trim()) {
      errors.applyingFor = 'Applying for Position is required';
    }

    // Relevant Experience validation (example for Developer and Designer)
    if ((data.applyingFor === 'Developer' || data.applyingFor === 'Designer') && !data.relevantExperience.trim()) {
      errors.relevantExperience = 'Relevant Experience is required';
    } else if ((data.applyingFor === 'Developer' || data.applyingFor === 'Designer') && +data.relevantExperience <= 0) {
      errors.relevantExperience = 'Relevant Experience must be greater than 0';
    }

    // Portfolio URL validation (example for Designer)
    if (data.applyingFor === 'Designer' && !data.portfolioUrl.trim()) {
      errors.portfolioUrl = 'Portfolio URL is required';
    } else if (data.applyingFor === 'Designer' && !isValidUrl(data.portfolioUrl)) {
      errors.portfolioUrl = 'Invalid URL format';
    }

    // Management Experience validation (example for Manager)
    if (data.applyingFor === 'Manager' && !data.managementExperience.trim()) {
      errors.managementExperience = 'Management Experience is required';
    }

    // Additional Skills validation
    if (data.additionalSkills.length === 0) {
      errors.additionalSkills = 'At least one skill must be selected';
    }

    // Preferred Interview Time validation
    if (!data.preferredInterviewTime.trim()) {
      errors.preferredInterviewTime = 'Preferred Interview Time is required';
    }

    return errors;
  };

  const isValidEmail = (email) => {
    // Basic email validation regex (customize as per your requirements)
    return /\S+@\S+\.\S+/.test(email);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    // Basic phone number validation regex (customize as per your requirements)
    return /^[0-9\s-]+$/.test(phoneNumber);
  };

  const isValidUrl = (url) => {
    // Basic URL validation regex (customize as per your requirements)
    return /^(ftp|http|https):\/\/[^ "]+$/.test(url);
  };

  return (
    <div>
      {!submittedData ? (
        <div>
          <h2 className='heading'>Job Application Form</h2>
          <form onSubmit={handleSubmit} noValidate>
            {/* Full Name */}
            <div>
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && <span className="error">{errors.fullName}</span>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
            </div>

            {/* Applying for Position (Dropdown) */}
            <div>
              <label htmlFor="applyingFor">Applying for Position</label>
              <select
                id="applyingFor"
                name="applyingFor"
                value={formData.applyingFor}
                onChange={handleChange}
              >
                <option value="">Select Position</option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Manager">Manager</option>
              </select>
              {errors.applyingFor && <span className="error">{errors.applyingFor}</span>}
            </div>

            {/* Relevant Experience (visible if Developer or Designer) */}
            {formData.applyingFor === 'Developer' || formData.applyingFor === 'Designer' ? (
              <div>
                <label htmlFor="relevantExperience">Relevant Experience (years)</label>
                <input
                  type="number"
                  id="relevantExperience"
                  name="relevantExperience"
                  value={formData.relevantExperience}
                  onChange={handleChange}
                />
                {errors.relevantExperience && <span className="error">{errors.relevantExperience}</span>}
              </div>
            ) : null}

            {/* Portfolio URL (visible if Designer) */}
            {formData.applyingFor === 'Designer' ? (
              <div>
                <label htmlFor="portfolioUrl">Portfolio URL</label>
                <input
                  type="url"
                  id="portfolioUrl"
                  name="portfolioUrl"
                  value={formData.portfolioUrl}
                  onChange={handleChange}
                />
                {errors.portfolioUrl && <span className="error">{errors.portfolioUrl}</span>}
              </div>
            ) : null}

            {/* Management Experience (visible if Manager) */}
            {formData.applyingFor === 'Manager' ? (
              <div>
                <label htmlFor="managementExperience">Management Experience</label>
                <textarea
                  id="managementExperience"
                  name="managementExperience"
                  value={formData.managementExperience}
                  onChange={handleChange}
                />
                {errors.managementExperience && <span className="error">{errors.managementExperience}</span>}
              </div>
            ) : null}

            {/* Additional Skills (Multiple checkboxes) */}
            <div>
              <label>Additional Skills</label>
              <div>
                <label>
                  <input
                    type="checkbox"
                    name="additionalSkills"
                    value="JavaScript"
                    checked={formData.additionalSkills.includes('JavaScript')}
                    onChange={handleChange}
                  />{' '}
                  JavaScript
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="additionalSkills"
                    value="CSS"
                    checked={formData.additionalSkills.includes('CSS')}
                    onChange={handleChange}
                  />{' '}
                  CSS
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="additionalSkills"
                    value="Python"
                    checked={formData.additionalSkills.includes('Python')}
                    onChange={handleChange}
                  />{' '}
                  Python
                </label>
              </div>
              {errors.additionalSkills && <span className="error">{errors.additionalSkills}</span>}
            </div>

            {/* Preferred Interview Time (Date and Time Picker) */}
            <div>
              <label htmlFor="preferredInterviewTime">Preferred Interview Time</label>
              <input
                type="datetime-local"
                id="preferredInterviewTime"
                name="preferredInterviewTime"
                value={formData.preferredInterviewTime}
                onChange={handleChange}
              />
              {errors.preferredInterviewTime && <span className="error">{errors.preferredInterviewTime}</span>}
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        // Display submitted data
        <div className='datahead'>
          <h2 className='heading'>Submitted Data</h2>
          <p><strong>Full Name:</strong> {submittedData.fullName}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Phone Number:</strong> {submittedData.phoneNumber}</p>
          <p><strong>Applying for Position:</strong> {submittedData.applyingFor}</p>
          {submittedData.applyingFor === 'Developer' || submittedData.applyingFor === 'Designer' ? (
            <p><strong>Relevant Experience:</strong> {submittedData.relevantExperience} years</p>
          ) : null}
          {submittedData.applyingFor === 'Designer' ? (
            <p><strong>Portfolio URL:</strong> <a href={submittedData.portfolioUrl} target="_blank" rel="noopener noreferrer">{submittedData.portfolioUrl}</a></p>
          ) : null}
          {submittedData.applyingFor === 'Manager' ? (
            <p><strong>Management Experience:</strong><br />{submittedData.managementExperience}</p>
          ) : null}
          <p><strong>Additional Skills:</strong> {submittedData.additionalSkills.join(', ')}</p>
          <p><strong>Preferred Interview Time:</strong> {submittedData.preferredInterviewTime}</p>
          <button onClick={() => setSubmittedData(null)}>Edit Application</button>
        </div>
      )}
    </div>
  );
};

export default JobApplicationForm;

