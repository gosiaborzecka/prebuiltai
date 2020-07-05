import * as React from 'react';
import styles from '../../cognitiveServices.module.scss';
import DescribeComponent from './Describe/DescribeComponent';


interface IComputerVision{
	showSettings: boolean;
	showSettingsText: string;
	apiKey: string;
	endpoint: string;
	imageUrl: string;
	showSampleData: boolean;
	showDescribe: boolean;

}

class ComputerVisionComponent extends React.Component<{}, IComputerVision> {

	constructor(props: string) {
		super(props)
		this.state = {
			showSettings: false,
			showSettingsText: 'Show Settings',
			apiKey: '',
			endpoint: '',
			imageUrl: '',
			showSampleData: false,
			showDescribe: false
		}
	}

	public render() {
		return (
			<div className={styles.cognitiveServices}>
			<div className={styles.settings}>
				<button onClick={this.handleShowSettings}>{this.state.showSettingsText}</button>
				{this.Settings()}
			</div>
			<div className={styles.container}>
				<div className={styles.blogPost}>
					<a href='https://gosiaborzecka.net'>Read more on the blog</a>
				</div>
				<h1>Computer Vision</h1>
				<div>
				<div className={styles.sampleCheckbox}>
					<label>Show sample data?</label>
					<input type='checkbox' onChange={this.handleSampleData} />
				</div>
					<div>
						<label>Image url: </label>
						<input type='text' onChange={this.handleImage} />
					</div>
				</div>
				{this.InitButtons()}
			{this.showComputerVisionReqests()}
			</div>
		</div>
		)
	}

	private handleShowSettings = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (this.state.showSettings) {
			this.setState({ showSettingsText: 'Show Settings' })
		} else {
			this.setState({ showSettingsText: 'Hide Settings' })
		}

		this.setState({ showSettings: !this.state.showSettings })
	}

	private handleApiSettings = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		this.setState({ apiKey: value });
	}

	private handleEndpoint = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		this.setState({ endpoint: value });
	}

	private handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		this.setState({imageUrl: value});
	}

	private handleSampleData = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({showSampleData: !this.state.showSampleData});
	}

	private Settings() {
		if (this.state.showSettings) {
			return (
				<div className={styles.border}>
					<h3>Cognitive Services Settings</h3>
					<div>
						<p>API Key</p>
						<input type='text' onChange={this.handleApiSettings} />
					</div>
					<div>
						<p>Endpoint</p>
						<input type='text' onChange={this.handleEndpoint} />
					</div>
				</div>
			)
		} else {
			return <></>
		}
	}

	private InitButtons() {
		return (
			<div className={styles.buttons}>
				<button className={styles.green} onClick={this.handleDescribe}>Describe</button>
				<div className={styles.last}>
					{/* <button className={styles.pink} onClick={this.handleAllRequest}>Send All Request</button> */}
				</div>
			</div>
		)
	}

	/**
	 * All data
	 */
	private handleAllRequest = (e: React.MouseEvent<HTMLButtonElement>) => {
		this.setState({ showDescribe: !this.state.showDescribe });
		
		this.showComputerVisionReqests();
	}

	/**
	 * Describe
	 */
	private handleDescribe = (e: React.MouseEvent<HTMLButtonElement>) => {
		this.setState({ showDescribe: !this.state.showDescribe });
	}

	/**
	 * Show data
	 */
	private showComputerVisionReqests(){
		if (this.state.showDescribe){
			return <DescribeComponent apiKey={this.state.apiKey} endpoint={this.state.endpoint} imageUrl={this.state.imageUrl} showSample={this.state.showSampleData} />
		} else {
			return <></>
		}
	}
}

export default ComputerVisionComponent;