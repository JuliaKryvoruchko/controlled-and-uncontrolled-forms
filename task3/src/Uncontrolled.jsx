import React, { useState, useRef } from 'react';
import './App.css';

function UncontrolledApp(initialValuesUncontrolled) {

    const [formValuesUncontrolled, setFormValuesUncontrolled] = useState(initialValuesUncontrolled);
    const [formErrorsUncontrolled, setFormErrorsUncontrolled] = useState({});
    const [showPasswordUncontrolled, setShowPasswordUncontrolled] = useState(false);
    const [showConfirmPasswordUncontrolled, setShowConfirmPasswordUncontrolled] = useState(false);
    const formRef = useRef(null);

    const handleChangeUncontrolled = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValueUncontrolled = type === 'checkbox' ? checked : value;
        setFormValuesUncontrolled({ ...formValuesUncontrolled, [name]: inputValueUncontrolled });
        setFormErrorsUncontrolled(validate({ ...formValuesUncontrolled, [name]: inputValueUncontrolled }));
    };

    const handleSubmitUncontrolled = (e) => {
        e.preventDefault();
        const errors = validate(formValuesUncontrolled);
        setFormErrorsUncontrolled(errors);
        if (Object.keys(errors).length === 0) {
            console.log("Uncontrolled", formValuesUncontrolled);
            formRef.current.reset();
            setFormValuesUncontrolled(initialValuesUncontrolled);
        }
    };

    const validate = (values) => {
        const errors = {};
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const regexUserName = /^[A-Za-z0-9_]\w{0,29}$/;

        if (!values.username) {
            errors.username = "Username is required";
        } else if (!regexUserName.test(values.username)) {
            errors.username = "Alphabets and numbers only";
        }

        if (!values.email) {
            errors.email = "Email is required";
        } else if (!regexEmail.test(values.email)) {
            errors.email = "Please enter a valid email address";
        }

        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 8) {
            errors.password = "Password must contain at least 8 symbols";
        }

        if (!values.confirmPassword) {
            errors.confirmPassword = "Confirm password is required";
        } else if (values.confirmPassword.length < 8) {
            errors.confirmPassword = "Password must contain at least 8 symbols";
        } else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        if (!values.agreeTerms) {
            errors.agreeTerms = "Please agree to the terms and conditions";
        }

        return errors;
    };

    const toggleShowPasswordUncontrolled = () => {
        setShowPasswordUncontrolled(!showPasswordUncontrolled);
    };

    const toggleShowConfirmPasswordUncontrolled = () => {
        setShowConfirmPasswordUncontrolled(!showConfirmPasswordUncontrolled);
    };

    return (
        <div className='containers'>
            <form onSubmit={handleSubmitUncontrolled} id="uncontrolled-form" ref={formRef}>
                <h1>Uncontrolled components</h1>
                <div className='form'>
                    <div className='field'>
                        <label>Username*</label>
                        <input type="text" name='username' placeholder='Enter your username' value={formValuesUncontrolled.username} onChange={handleChangeUncontrolled} />
                        <p>{formErrorsUncontrolled.username}</p>
                    </div>
                    <div className='field'>
                        <label>Email*</label>
                        <input type="email" name='email' placeholder='Enter your email' value={formValuesUncontrolled.email} onChange={handleChangeUncontrolled} />
                        <p>{formErrorsUncontrolled.email}</p>
                    </div>
                    <div className='field'>
                        <label>Password*</label>
                        <div className="password-field">
                            <input type={showPasswordUncontrolled ? "text" : "password"} name='password' placeholder='Enter your password' value={formValuesUncontrolled.password} onChange={handleChangeUncontrolled} />
                            <button type="button" className="toggle-password-button" onClick={toggleShowPasswordUncontrolled}>
                                {showPasswordUncontrolled ? <img src="./img/Group.png" alt="Hide Password" /> : <img src="./img/Icons.png" alt="Show Password" />}
                            </button>
                        </div>
                        <p>{formErrorsUncontrolled.password}</p>
                    </div>
                    <div className='field'>
                        <label>Confirm password*</label>
                        <div className="password-field">
                            <input type={showConfirmPasswordUncontrolled ? "text" : "password"} name='confirmPassword' placeholder='Enter your password' value={formValuesUncontrolled.confirmPassword} onChange={handleChangeUncontrolled} />
                            <button type="button" className="toggle-password-button" onClick={toggleShowConfirmPasswordUncontrolled}>
                                {showConfirmPasswordUncontrolled ? <img src="./img/Group.png" alt="Hide Password" /> : <img src="./img/Icons.png" alt="Show Password" />}
                            </button>
                        </div>
                        <p>{formErrorsUncontrolled.confirmPassword}</p>
                    </div>
                    <div className='checkbox'>
                        <input type="checkbox" name="agreeTerms" className='checkBox' checked={formValuesUncontrolled.agreeTerms} onChange={handleChangeUncontrolled} />
                        <label className='acception'>I agree to the terms and conditions</label>
                        <p>{formErrorsUncontrolled.agreeTerms}</p>
                    </div>
                    <div className='btnInfo'>
                        <button type="submit" className='button'>Register</button>
                        <p className='imp-info'>*Required field</p>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default UncontrolledApp;
