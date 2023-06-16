import { forwardRef } from 'react';
import { styled } from '@mui/system';
import { CircularProgress } from '@mui/material';

export const Loading = styled('div')(() => ({
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: '#0006',
  zIndex: 10000,
}));

const LoadingContainer = forwardRef(
  (
    {
      loading = false,
      loadingClass,
      size = 50,
      children,
      className,
      as = 'div',
      ...rest
    },
    ref,
  ) => {
    let Component = as;

    return (
      <Component ref={ref} className={className} {...rest}>
        {loading ? (
          <Loading className={loadingClass}>
            <CircularProgress color="secondary" size={size} />
          </Loading>
        ) : null}
        {children}
      </Component>
    );
  },
);
LoadingContainer.displayName = 'LoadingContainer';
export default LoadingContainer;
