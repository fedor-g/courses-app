import React from 'react';
import styles from './registration.module.scss';
import { Button } from 'src/common/Button/Button';
import { Input } from 'src/common/Input/Input';
import { Link, useNavigate } from 'react-router-dom';

export const Registration = () => {
	localStorage.setItem('token', '');
	localStorage.setItem('userName', '');
	const navigate = useNavigate();

	async function handleSubmit(event) {
		event.preventDefault();

		document.getElementById('falseName').innerHTML = '';
		document.getElementById('falseEmail').innerHTML = '';
		document.getElementById('falsePassword').innerHTML = '';
		document.getElementById('failToRegister').innerHTML = '';

		const name: string = event.target.name.value;
		const email: string = event.target.email.value;
		const password: string = event.target.password.value;

		let fail = false;

		if (!name) {
			document.getElementById('falseName').innerHTML = 'Name is required';
			fail = true;
		}
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
			document.getElementById('failToRegister').innerHTML = errors.join(', ');
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
				<p className={styles.error} id='falseName' />
				<label className={styles.param}>Email</label>
				<Input className={styles.input} id='email' label='email' />
				<p className={styles.error} id='falseEmail' />
				<label className={styles.param}>Password</label>
				<Input className={styles.input} id='password' label='password' />
				<p className={styles.error} id='falsePassword' />
				<p className={styles.error} id='failToRegister' />
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
