import React, { useState, useEffect, useRef } from 'react';
import './App.css';
function ControlledApp(initialValuesControlled) {
    const [formValuesControlled, setFormValuesControlled] = useState(initialValuesControlled);
    const [formErrorsControlled, setFormErrorsControlled] = useState({});
    const [isRegisterControlled, setIsRegisterControlled] = useState(false);
    const [registeredUsersControlled, setRegisteredUsersControlled] = useState([]);
    const [showPasswordControlled, setShowPasswordControlled] = useState(false);
    const [showConfirmPasswordControlled, setShowConfirmPasswordControlled] = useState(false);
    const formRef = useRef(null);


    useEffect(() => {
        const savedUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        setRegisteredUsersControlled(savedUsers);
    }, []);

    const handleChangeControlled = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValueControlled = type === 'checkbox' ? checked : value;
        setFormValuesControlled({ ...formValuesControlled, [name]: inputValueControlled });
        setFormErrorsControlled(validate({ ...formValuesControlled, [name]: inputValueControlled }));
    };

    const handleSubmitControlled = (e) => {
        e.preventDefault();
        const errors = validate(formValuesControlled);
        setFormErrorsControlled(errors);
        if (Object.keys(errors).length === 0) {
            setIsRegisterControlled(true);
            formRef.current.reset();
            setFormValuesControlled(initialValuesControlled);
        }
    };


    useEffect(() => {
        if (isRegisterControlled && formValuesControlled.agreeTerms) {
            const isUsernameExists = registeredUsersControlled.some(user => user.username === formValuesControlled.username);
            const isEmailExists = registeredUsersControlled.some(user => user.email === formValuesControlled.email);

            if (isUsernameExists) {
                setFormErrorsControlled(prevErrors => ({ ...prevErrors, username: "An account using this username already exists" }));
                return;
            }

            if (isEmailExists) {
                setFormErrorsControlled(prevErrors => ({ ...prevErrors, email: "An account using this email address already exists" }));
                return;
            }

            const newUser = {
                username: formValuesControlled.username,
                email: formValuesControlled.email
            };
            const updatedUsers = [...registeredUsersControlled, newUser];
            setRegisteredUsersControlled(updatedUsers);
            setFormValuesControlled(initialValuesControlled);
            localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
            setIsRegisterControlled(false);
        }
    }, [formValuesControlled, isRegisterControlled, registeredUsersControlled, initialValuesControlled]);

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

    const toggleShowPasswordControlled = () => {
        setShowPasswordControlled(!showPasswordControlled);
    };

    const toggleShowConfirmPasswordControlled = () => {
        setShowConfirmPasswordControlled(!showConfirmPasswordControlled);
    };

    return (
        <div className='containers'>
            <form onSubmit={handleSubmitControlled} ref={formRef}>
                <h1>Controlled components</h1>
                <div className='form'>
                    <div className='field'>
                        <label>Username*</label>
                        <input type="text" name='username' placeholder='Enter your username' value={formValuesControlled.username} onChange={handleChangeControlled} />
                        <p>{formErrorsControlled.username}</p>
                    </div>
                    <div className='field'>
                        <label>Email*</label>
                        <input type="email" name='email' placeholder='Enter your email' value={formValuesControlled.email} onChange={handleChangeControlled} />
                        <p>{formErrorsControlled.email}</p>
                    </div>
                    <div className='field'>
                        <label>Password*</label>
                        <div className="password-field">
                            <input type={showPasswordControlled ? "text" : "password"} name='password' placeholder='Enter your password' value={formValuesControlled.password} onChange={handleChangeControlled} />
                            <button type="button" className="toggle-password-button" onClick={toggleShowPasswordControlled}>
                                {showPasswordControlled ? <img src="./img/Group.png" alt="Hide Password" /> : <img src="./img/Icons.png" alt="Show Password" />}
                            </button>
                        </div>
                        <p>{formErrorsControlled.password}</p>
                    </div>
                    <div className='field'>
                        <label>Confirm password*</label>
                        <div className="password-field">
                            <input type={showConfirmPasswordControlled ? "text" : "password"} name='confirmPassword' placeholder='Enter your password' value={formValuesControlled.confirmPassword} onChange={handleChangeControlled} />
                            <button type="button" className="toggle-password-button" onClick={toggleShowConfirmPasswordControlled}>
                                {showConfirmPasswordControlled ? <img src="./img/Group.png" alt="Hide Password" /> : <img src="./img/Icons.png" alt="Show Password" />}
                            </button>
                        </div>
                        <p>{formErrorsControlled.confirmPassword}</p>
                    </div>
                    <div className='checkbox'>
                        <input type="checkbox" name="agreeTerms" className='checkBox' checked={formValuesControlled.agreeTerms} onChange={handleChangeControlled} />
                        <label className='acception'>I agree to the terms and conditions</label>
                        <p>{formErrorsControlled.agreeTerms}</p>
                    </div>
                    <div className='btnInfo'>
                        <button className='button'>Register</button>
                        <p className='imp-info'>*Required field</p>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ControlledApp;