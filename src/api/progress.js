/* eslint-disable import/no-anonymous-default-export */
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import './nprogress.css';

NProgress.configure ({ showSpinner: false });

let counter = 0,
	timer = false;


export default {
	start ()
	{
		clearTimeout ( timer );

		if ( !counter ) NProgress.start();

		counter++;

		return counter; // just for debug
	},
	stop ( count /* just for debug */ )
	{
		if ( !counter ) return;

		counter--;

		if ( counter < 0 )
		{
			console.error ( 'progress counter < 0' );

			counter = 0;
		}
		
		if ( !counter )
		{
			clearTimeout ( timer );

			setTimeout ( NProgress.done, 100 );
		}
	}
};
