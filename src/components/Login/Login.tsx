import React, { useState } from 'react';
import styles from './login.module.scss';
import { Button } from 'src/common/Button/Button';
import { Input } from 'src/common/Input/Input';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'src/helpers/hooks';
import { checkMe, login } from 'src/services';

export const Login = () => {
	localStorage.setItem('token', '');
	localStorage.setItem('userRole', '');
	const dispatch = useAppDispatch();

	const [falseEmail, setEmailState] = useState('');
	const [falsePassword, setPassState] = useState('');
	const [failToLogin, setLoginState] = useState('');
	const navigate = useNavigate();

	async function handleSubmit(event) {
		setEmailState('');
		setPassState('');
		setLoginState('');
		event.preventDefault();

		const email: string = event.target.email.value;
		const password: string = event.target.password.value;

		let fail = false;

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

		const user = {
			email,
			password,
		};

		const result = await login(user);

		if (result === false) {
			setLoginState(() => 'Fail to login');
			return false;
		}

		const roleCheck = await checkMe(result.result);

		if (result === false) {
			setLoginState(() => 'Invalid user role');
			return false;
		}

		localStorage.setItem('token', result.result);
		localStorage.setItem('activeSession', 'true');
		localStorage.setItem('userRole', roleCheck.role);

		dispatch({
			type: 'CURRENT_USER:GET_USERS/ME',
			payload: {
				name: result.user.name,
				email: result.user.email,
			},
		});

		navigate('/courses', { replace: true });
	}

	return (
		<div className={styles.login}>
			<p className={styles.title}>Login</p>
			<form className={styles.form} onSubmit={handleSubmit}>
				<label className={styles.mainparam}>Email</label>
				<Input className={styles.input} id='email' label='email' />
				<p className={styles.error}>{falseEmail}</p>
				<label className={styles.param}>Password</label>
				<Input
					className={styles.input}
					id='password'
					label='password'
					type='password'
				/>
				<p className={styles.error}>{falsePassword}</p>
				<p className={styles.error}>{failToLogin}</p>
				<Button className={styles.button} buttonText={'Login'} type='submit' />
			</form>
			<p className={styles.register}>
				If you don't have an account you may{' '}
				<Link to='/registration'>Register</Link>
			</p>
		</div>
	);
};
