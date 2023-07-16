import React, { useMemo } from 'react';
const icons = {
		image: [ 'bmp', 'jpg', 'jpeg', 'png', 'gif', 'tif', 'tiff' ],
		text: [ 'rtf', 'doc', 'docx' ],
		'pdf-2': [ 'pdf' ],
		media: [ 'mp3', 'mpg', 'gif', 'mpeg', 'avi', 'wmv' ]
	},
	colors = {
		image: '#048750',
		text: '#0039A6',
		'pdf-2': '#E30613',
		media: '#151515',
		file: '#54566C'
	};


export default React.memo ( FileFormatIcon );

function FileFormatIcon ({ fileName })
{
	const name = useMemo (
		() => {
			const format = ( String ( fileName ).toLowerCase().match ( /\.[^.]*$/ ) || [] )[ 0 ];

			if ( !format ) return 'file';

			return Object.keys ( icons )
				.find (
					name => icons[ name ].indexOf (
						format.slice ( 1 )
					) !== -1
				) || 'file';
		},
		[ fileName ]
	);

	return <i className={ `base-icon-${ name }` } style={{ color: colors[ name ] }} />;
}
