import React from 'react';
declare module 'react' {
	interface DOMAttributes<T> {
		onResize?: ReactEventHandler<T> | undefined;
		onResizeCapture?: ReactEventHandler<T> | undefined;
		nonce?: string | undefined;
	}
}
