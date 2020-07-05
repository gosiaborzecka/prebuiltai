import * as React from 'react';
import CognitiveServicesComponent from './CognitiveServices/CognitiveServicesComponent';

import styles from './styles.module.scss';

interface IIndex {
	showCognitiveServices: boolean;
}


class IndexComponent extends React.Component<{}, IIndex> {

	constructor(props: string) {
		super(props)
		this.state = {
			showCognitiveServices: false
		}
	}

	public render() {
		return (
			<div className={styles.main}>
				<CognitiveServicesComponent />
			</div>
		)
	}
}


export default IndexComponent