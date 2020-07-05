import * as React from 'react';
import ComputerVisionComponent from './Vision/ComputerVision/ComputerVisionComponent';

import styles from './cognitiveServices.module.scss'

interface ICognitiveServicesComponent {
	showCognitiveServices: boolean;
}


class CognitiveServicesComponent extends React.Component<{}, ICognitiveServicesComponent> {

	constructor(props: string) {
		super(props)
		this.state = {
			showCognitiveServices: false
		}
	}

	public render() {
		return (
			<div className={styles.cognitiveServices}>
                <ComputerVisionComponent />
			</div>
		)
	}

}


export default CognitiveServicesComponent