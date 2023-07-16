import React, { useCallback, useMemo } from 'react';
import Select from 'react-select';
const noOptionsMessage = () => "Ничего не найдено";

export default React.memo ( SelectInput );

function SelectInput ({
	options = [],
	value,
	name,
	onChange,
	isMulti,
	isSearchable = false,
	mobileSize = 'base',
	...rest
}) {
	const handleChange = useCallback (
			option => onChange ({ target: { ...option, name } }),
			[ name, onChange ]
		),
		singleValue = useMemo (
			() => {
				if (value === '') {
					return '';
				}
				return isMulti ? false : options.find ( option => String ( value ) === String ( option.value ) )
			},
			[ options, value, isMulti ]
		);

	return (
		<Select
			className="custom-select"
			classNamePrefix="custom-select"
			onChange={ isMulti ? onChange : handleChange }
			value={ isMulti ? value : singleValue }
			{...{
				isMulti,
				options,
				name,
				isSearchable,
				noOptionsMessage,
				styles: {
					option: ( provided, state ) => ({
						...provided,
						cursor: 'pointer',
						padding: '16px 30px',
						userSelect: 'none',
						transition: '300ms ease',
						lineHeight: 1,
						background: state.isSelected ? '#EFEFF4' : '',
						color: state.isSelected ? 'inherit' : '',
						'&.with-checkbox': {
							background: 'none',
							padding: '8px 20px'
						}
					}),
					control: ( base, state ) => ({
						position: 'relative',
						background: state.menuIsOpen ? '#EFEFF4' : '#FFFFFF',
						display: 'flex',
						alignItems: 'center',
						height: 56,
						minHeight: 56,
						fontSize: 18,
						border: state.selectProps.error ? '1px solid #FF6666' : '1px solid #DBDBDB',
						borderRadius: 4,
						width: '100%',
						textAlign: 'left',
						cursor: 'pointer',
						padding: '4px 45px 4px 18px',
						transition: 'all 300ms ease-in-out',
						lineHeight: 1,
						'&:before': {
							content: '""',
							position: 'absolute',
							top: '50%',
							right: 18,
							width: 0,
							height: 0,
							borderLeft: '5px solid transparent',
							borderRight: '5px solid transparent',
							borderTop: '5px solid #0039A6',
							marginTop: -1
						},
						'&:hover': {},
						'@media screen and (max-width: 767.99px)': mobileSize === 'big' 
							? {
								fontSize: 16
							} : {
							fontSize: 16,
							height: 40,
							minHeight: 40,
							paddingRight: 30,
							'&:before': {
								right: 13
							}
						}
					}),
					dropdownIndicator: () => ({ display: 'none' }),
					indicatorSeparator: () => ({ display: 'none' }),
					valueContainer: base => ({
						position: 'relative',
						overflow: 'hidden',
						height: '1em',
						display: 'flex',
						alignItems: 'center',
						marginRight: 'auto',
						width: '100%',
						'div': {
							whiteSpace: 'nowrap',
							textOverflow: 'ellipsis',
							overflow: 'hidden',
						}
					}),
					menu: base => ({
						position: 'absolute',
						backgroundColor: '#fff',
						color: '#000',
						fontSize: 18,
						boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
						borderRadius: 8,
						border: '1px solid #D1D1D1',
						margin: '4px 0 0',
						padding: '20px 0',
						top: '100%',
						left: 0,
						right: 0,
						minWidth: 250,
						zIndex: 3,
					}),
					menuList: base => ({
						...base,
						maxHeight: 253,
						'&::-webkit-scrollbar-track': {
							borderRadius: '10px',
							backgroundColor: '#F5F5F5'
						},
						'&::-webkit-scrollbar': {
							width: '6px',
							background: '#E7E7E7'
						},					
						'&::-webkit-scrollbar-thumb': {
							borderRadius: '15px',
							background: '#B3B3B3'
						}
					}),
					placeholder: base => ({
						...base,
						margin: 0,
						width: '100%',
					}),
					singleValue: base => ({
						...base,
						margin: 0,
						width: '100%',
					})
				}
			}}
			{ ...rest }
		/>
	);
}
