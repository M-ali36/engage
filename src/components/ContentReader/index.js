import React, {forwardRef} from 'react'
import PropTypes from 'prop-types';
import useComponent from './useComponent'

const ContentReader = forwardRef(({data}, ref) => {

	const { getComponent } = useComponent()
	const currentComponent = getComponent(data)

	return (
		<>
		{ref &&
			<div ref={ref}>{currentComponent}</div>
		}
		{!ref &&
			<>{currentComponent}</>
		}
		</>
	)
})

export default ContentReader

ContentReader.displayName = 'ContentReader';

ContentReader.propTypes = {
  data: PropTypes.object
};