import React, { useState } from 'react';
import styles from './registration.module.scss';
import { Button } from 'src/common/Button/Button';
import { Input } from 'src/common/Input/Input';
import { Link, useNavigate } from 'react-router-dom';

export const Registration = () => {
	localStorage.setItem('token', '');
	localStorage.setItem('userName', '');

	const [falseName, setNameState] = useState('');
	const [falseEmail, setEmailState] = useState('');
	const [falsePassword, setPassState] = useState('');
	const [failToRegister, setRegisterState] = useState('');

	const navigate = useNavigate();

	async function handleSubmit(event) {
		event.preventDefault();

		setNameState('');
		setEmailState('');
		setPassState('');
		setRegisterState('');

		const name: string = event.target.name.value;
		const email: string = event.target.email.value;
		const password: string = event.target.password.value;

		let fail = false;

		if (!name) {
			setNameState(() => 'Name is required');
			fail = true;
		}
		if (!email) {
			setEmailState(() => 'Email is required');
			fail = true;
		} else {
			const re = /\S+@\S+\.\S+/;
			if (!re.test(email)) {
				setEmailState(() => 'Email is incorrect');
				fail = true;
			}
		}
		if (!password) {
			setPassState(() => 'Password is required');
			fail = true;
		}

		if (fail) return false;

		const newUser = {
			name,
			email,
			password,
		};

		const response = await fetch('http://localhost:4000/register', {
			method: 'POST',
			body: JSON.stringify(newUser),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const result = await response.json();

		if (result.successful === false) {
			const errors: Array<string> = result.errors;
			setRegisterState(() => errors.join(', '));
			return false;
		}

		navigate('/login', { replace: true });
	}

	return (
		<div className={styles.register}>
			<p className={styles.title}>Registration</p>
			<form className={styles.form} onSubmit={handleSubmit}>
				<label className={styles.mainparam}>Name</label>
				<Input className={styles.input} id='name' label='name' />
				<p className={styles.error}>{falseName}</p>
				<label className={styles.param}>Email</label>
				<Input className={styles.input} id='email' label='email' />
				<p className={styles.error} id='falseEmail'>
					{falseEmail}
				</p>
				<label className={styles.param}>Password</label>
				<Input className={styles.input} id='password' label='password' />
				<p className={styles.error}>{falsePassword}</p>
				<p className={styles.error}>{failToRegister}</p>
				<Button
					className={styles.button}
					buttonText={'Register'}
					type='submit'
				/>
			</form>
			<p className={styles.login}>
				If you have an account you may <Link to='/login'>Login</Link>
			</p>
		</div>
	);
};
