import React from 'react';
import styles from './login.module.scss';
import { Button } from 'src/common/Button/Button';
import { Input } from 'src/common/Input/Input';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
	localStorage.setItem('token', '');
	localStorage.setItem('userName', '');
	const navigate = useNavigate();

	async function handleSubmit(event) {
		event.preventDefault();

		document.getElementById('falseEmail').innerHTML = '';
		document.getElementById('falsePassword').innerHTML = '';
		document.getElementById('failToLogin').innerHTML = '';

		const email: string = event.target.email.value;
		const password: string = event.target.password.value;

		let fail = false;

		if (!email) {
			document.getElementById('falseEmail').innerHTML = 'Email is required';
			fail = true;
		} else {
			const re = /\S+@\S+\.\S+/;
			if (!re.test(email)) {
				document.getElementById('falseEmail').innerHTML = 'Email is incorrect';
				fail = true;
			}
		}
		if (!password) {
			document.getElementById('falsePassword').innerHTML =
				'Password is required';
			fail = true;
		}

		if (fail) return false;

		const user = {
			email,
			password,
		};

		const response = await fetch('http://localhost:4000/login', {
			method: 'POST',
			body: JSON.stringify(user),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const result = await response.json();

		if (result.successful === false) {
			document.getElementById('failToLogin').innerHTML = result.result;
			return false;
		}

		localStorage.setItem('token', result.result);
		localStorage.setItem('userName', result.user.name);
		navigate('/courses', { replace: true });
	}

	return (
		<div className={styles.login}>
			<p className={styles.title}>Login</p>
			<form className={styles.form} onSubmit={handleSubmit}>
				<label className={styles.mainparam}>Email</label>
				<Input className={styles.input} id='email' label='email' />
				<p className={styles.error} id='falseEmail' />
				<label className={styles.param}>Password</label>
				<Input className={styles.input} id='password' label='password' />
				<p className={styles.error} id='falsePassword' />
				<p className={styles.error} id='failToLogin' />
				<Button className={styles.button} buttonText={'Login'} type='submit' />
			</form>
			<p className={styles.register}>
				If you don't have an account you may{' '}
				<Link to='/registration'>Register</Link>
			</p>
		</div>
	);
};
