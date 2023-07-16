import React from 'react';
import { SignatureCard } from 'components';
import { useSelector } from 'react-redux';


export default React.memo ( FilledSignatureSection );

function FilledSignatureSection ({ normalizedId, onRemove })
{
	const title = useSelector (
		st => getFirstSignatureValue ( normalizedId, st.statement.normalized )
	);

	return <SignatureCard name=" " {...{ title, onRemove }} />;
}


function getFirstSignatureValue ( normalizedId, normalized )
{
	const { [ normalizedId ]: { type, value, blocks } } = normalized;

	if ( type === 'DIGITAL_SIGNATURE' ) return value || null;

	return blocks.reduce (
		( res, normalizedId ) => res || getFirstSignatureValue ( normalizedId, normalized ),
		null
	);
}