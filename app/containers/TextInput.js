import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { BorderlessButton } from 'react-native-gesture-handler';

import sharedStyles from '../views/Styles';
import TextInput from '../presentation/TextInput';
import { themes } from '../constants/colors';
import { CustomIcon } from '../lib/Icons';

const styles = StyleSheet.create({
	error: {
		textAlign: 'center',
		paddingTop: 5
	},
	inputContainer: {
		marginBottom: 10
	},
	label: {
		marginBottom: 10,
		fontSize: 14,
		...sharedStyles.textSemibold
	},
	description: {
		marginBottom: 10,
		fontSize: 15,
		...sharedStyles.textRegular
	},
	hint: {
		marginTop: 10,
		fontSize: 14,
		...sharedStyles.textRegular
	},
	input: {
		...sharedStyles.textRegular,
		height: 48,
		fontSize: 16,
		paddingLeft: 14,
		paddingRight: 14,
		borderWidth: StyleSheet.hairlineWidth,
		borderRadius: 2
	},
	inputIconLeft: {
		paddingLeft: 45
	},
	inputIconRight: {
		paddingRight: 45
	},
	wrap: {
		position: 'relative'
	},
	iconContainer: {
		position: 'absolute',
		top: 14
	},
	iconLeft: {
		left: 15
	},
	iconRight: {
		right: 15
	}
});


export default class RCTextInput extends React.PureComponent {
	static propTypes = {
		label: PropTypes.string,
		description: PropTypes.string,
		hint: PropTypes.string,
		error: PropTypes.object,
		secureTextEntry: PropTypes.bool,
		containerStyle: PropTypes.any,
		inputStyle: PropTypes.object,
		inputRef: PropTypes.func,
		testID: PropTypes.string,
		iconLeft: PropTypes.string,
		placeholder: PropTypes.string,
		theme: PropTypes.string
	}

	static defaultProps = {
		error: {},
		theme: 'light'
	}

	state = {
		showPassword: false
	}

	get iconLeft() {
		const { testID, iconLeft, theme } = this.props;
		return (
			<CustomIcon
				name={iconLeft}
				testID={testID ? `${ testID }-icon-left` : null}
				style={[styles.iconContainer, styles.iconLeft, { color: themes[theme].bodyText }]}
				size={20}
			/>
		);
	}

	get iconPassword() {
		const { showPassword } = this.state;
		const { testID, theme } = this.props;
		return (
			<BorderlessButton onPress={this.tooglePassword} style={[styles.iconContainer, styles.iconRight]}>
				<CustomIcon
					name={showPassword ? 'Eye' : 'eye-off'}
					testID={testID ? `${ testID }-icon-right` : null}
					style={{ color: themes[theme].auxiliaryText }}
					size={20}
				/>
			</BorderlessButton>
		);
	}

	tooglePassword = () => {
		this.setState(prevState => ({ showPassword: !prevState.showPassword }));
	}

	render() {
		const { showPassword } = this.state;
		const {
			label, description, hint, error, secureTextEntry, containerStyle, inputRef, iconLeft, inputStyle, testID, placeholder, theme, ...inputProps
		} = this.props;
		const { dangerColor } = themes[theme];
		return (
			<View style={[styles.inputContainer, containerStyle]}>
				{label ? (
					<Text
						contentDescription={null}
						accessibilityLabel={null}
						style={[
							styles.label,
							{ color: themes[theme].titleText },
							error.error && { color: dangerColor }
						]}
					>
						{label}
					</Text>
				) : null}
				{description ? (
					<Text
						contentDescription={null}
						accessibilityLabel={null}
						style={[
							styles.description,
							{ color: themes[theme].auxiliaryText },
							error.error && { color: dangerColor }
						]}
					>
						{description}
					</Text>
				) : null}
				<View style={styles.wrap}>
					<TextInput
						style={[
							styles.input,
							error.error && {
								color: dangerColor,
								borderColor: dangerColor
							},
							iconLeft && styles.inputIconLeft,
							secureTextEntry && styles.inputIconRight,
							{
								backgroundColor: themes[theme].backgroundColor,
								borderColor: themes[theme].separatorColor,
								color: themes[theme].titleText
							},
							inputStyle
						]}
						ref={inputRef}
						autoCorrect={false}
						autoCapitalize='none'
						underlineColorAndroid='transparent'
						secureTextEntry={secureTextEntry && !showPassword}
						testID={testID}
						accessibilityLabel={placeholder}
						placeholder={placeholder}
						contentDescription={placeholder}
						theme={theme}
						{...inputProps}
					/>
					{iconLeft ? this.iconLeft : null}
					{secureTextEntry ? this.iconPassword : null}
				</View>
				{error.error ? <Text style={[styles.error, { color: dangerColor }]}>{error.reason}</Text> : null}
				{hint ? <Text style={[styles.hint, { color: themes[theme].auxiliaryText }]}>{hint}</Text> : null}
			</View>
		);
	}
}
