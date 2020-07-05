import * as React from 'react';
import request from 'request';
import { IDescribeRequest } from './IDescribeRequest';
import DescribeResult from './DescribeResult';
import styles from '../../../cognitiveServices.module.scss';

interface IDescribeComponent {
	apiKey: string;
	endpoint: string;
	imageUrl: string;
	showSample: boolean;
}

interface IDescribeComponentState {
	maxCandidate: string;
	language: string;
	describeRequestUrl: string;
	describeJson: object;
	describeRequest: IDescribeRequest;
	showDescribeResult: boolean;
	requestButtonText: string;
}

class DescribeComponent extends React.Component<IDescribeComponent, IDescribeComponentState> {

	constructor(props: IDescribeComponent) {
		super(props);
		this.state = {
			maxCandidate: '1',
			language: 'en',
			describeRequestUrl: '',
			describeJson: JSON.parse('{}'),
			describeRequest: {
				description: {
					tags: [],
					captions: [{
						text: '',
						confidence: ''
					}],
				}
			},
			showDescribeResult: false,
			requestButtonText: 'Send Request'
		}
	}

	public render() {
		return (
			<div>
				<div>
					{this.showImage()}
				</div>
				<div className={styles.selects}>
					<label>Max candidate: </label>
					<select onChange={this.handleChangeMaxCandidate}>
						<option value='1'>1</option>
						<option value='2'>2</option>
						<option value='3'>3</option>
						<option value='4'>4</option>
						<option value='5'>5</option>
						<option value='6'>6</option>
						<option value='7'>7</option>
						<option value='8'>8</option>
						<option value='9'>9</option>
						<option value='10'>10</option>
						<option value='11'>11</option>
						<option value='12'>12</option>
						<option value='13'>13</option>
						<option value='14'>14</option>
						<option value='15'>15</option>
					</select>
				</div>
				<div className={styles.selects}>
					<label>Language:</label>
					<select onChange={this.handleChangeLanguage}>
						<option value='en'>English</option>
						<option value='es'>Spanish</option>
						<option value='ja'>Japanese</option>
						<option value='pt'>Portugese</option>
						<option value='zh'>Simplified Chinese</option>
					</select>
				</div>
				<div className={styles.buttons}>
					<button className={styles.pink} onClick={this.handleSendRequest}>{this.state.requestButtonText}</button>
				</div>
				{this.showDescribe()}
			</div>
		)
	}

	private handleChangeMaxCandidate = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target;
		this.setState({ maxCandidate: value })
	}

	private handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target;
		this.setState({ language: value })
	}

	private handleSendRequest = (e: React.MouseEvent<HTMLButtonElement>) => {
		this.setState({ showDescribeResult: true });
		this.createDescribeRequest();
	}

	private showImage(){
		if (this.props.showSample){
			return <img src='https://gosiaborzecka.net/static/9bacdce9827c8f4799dc367b32a32190/0047d/workshop02.jpg' alt='' />
		} else {
			return <img src={this.props.imageUrl} alt='' />
		}
	}


	private async createDescribeRequest() {
		if (!this.props.showSample) {
			if (this.props.apiKey !== '' || this.props.apiKey !== null || this.props.endpoint !== '' || this.props.endpoint !== null) {


				let uriBase = `${this.props.endpoint}/vision/v3.0/describe?maxCandidates=${this.state.maxCandidate}&language=${this.state.language}`;

				const options = {
					uri: uriBase,
					body: `{'url': '${this.props.imageUrl}'}`,
					headers: {
						'Content-Type': 'application/json',
						'Ocp-Apim-Subscription-Key': this.props.apiKey
					}
				};

				await request.post(options, (error, response, body) => {
					if (error) {
						console.error('Error: ', error);
						return;
					}
					let jsonResponse: IDescribeRequest = JSON.parse(body);

					this.setState({
						describeRequestUrl: uriBase,
						describeRequest: jsonResponse,
						describeJson: jsonResponse
					});

					console.log(JSON.stringify(jsonResponse));
					return jsonResponse;
				});
			}
		} else {
			let uriBase = `https://{{baseUrl}}//vision/v3.0/describe?maxCandidates=15&language=${this.state.language}`;
			let jsonString = this.createSampleRequest();
			let jsonResponse = JSON.parse(jsonString);

			this.setState({
				describeRequestUrl: uriBase,
				describeRequest: jsonResponse,
				describeJson: jsonResponse
			});

			return jsonResponse;
		}

	}

	private createSampleRequest(){
		let json = '';
		switch (this.state.language) {
			case 'en':
				json = '{"description":{"tags":["person","people","indoor","group","woman","looking","sitting","standing","photo","man","front","table","young","holding","girl","food","kitchen","room","phone","playing","computer","shirt"],"captions":[{"text":"a group of people looking at the camera","confidence":0.9637943977496417},{"text":"a group of people looking at a phone","confidence":0.8163608388985742},{"text":"a group of people sitting and looking at the camera","confidence":0.8153608388985742},{"text":"a group of people around each other","confidence":0.8143608388985742},{"text":"a group of people sitting at a table","confidence":0.8133608388985742},{"text":"a group of people looking at camera","confidence":0.8123608388985742},{"text":"a group of people looking at each other","confidence":0.8113608388985742},{"text":"a group of people are looking at the camera","confidence":0.8103608388985742},{"text":"a group of people looking at a cell phone","confidence":0.7539390755351973},{"text":"a group of people in a room","confidence":0.7529390755351973},{"text":"a group of people posing for the camera","confidence":0.7519390755351973},{"text":"a group of people sitting around a table","confidence":0.7509390755351973},{"text":"a group of people that are looking at the camera","confidence":0.7499390755351973},{"text":"a group of people who are looking at the camera","confidence":0.7489390755351973},{"text":"a group of people standing in a room","confidence":0.7479390755351973}]},"requestId":"216fbedb-b3ad-42c4-a359-30442f4eb4dc","metadata":{"width":1620,"height":1080,"format":"Jpeg"}}';
				break;
			case 'es':
				json = '{"description":{"tags":["persona","gente","interior","grupo","mujer","viendo","parado","foto","hombre","frente","tabla","joven","sostener","niña","alimentos","cocina","cuarto","teléfono","jugando","computadora","camiseta"],"captions":[{"text":"un grupo de mujeres sentadas en una mesa","confidence":0.6499770459618482},{"text":"grupo de personas alrededor de una mesa","confidence":0.6489770459618482},{"text":"un grupo de personas alrededor de una mesa","confidence":0.6479770459618482},{"text":"un grupo de mujeres","confidence":0.6469770459618482},{"text":"un grupo de personas sentadas alrededor de una mesa","confidence":0.6459770459618482},{"text":"grupo de personas sentadas alrededor de una mesa","confidence":0.6449770459618482},{"text":"un grupo de personas en un salón de clases","confidence":0.6278959426980867},{"text":"un grupo de personas sentadas en una mesa","confidence":0.6268959426980867},{"text":"grupo de personas sentadas en una mesa","confidence":0.6258959426980867},{"text":"un grupo de personas reunidas en una mesa","confidence":0.6248959426980867},{"text":"un grupo de personas frente a una mesa","confidence":0.6238959426980867},{"text":"grupo de personas sentados en una mesa","confidence":0.6228959426980867},{"text":"un grupo de personas sentados en una mesa","confidence":0.6218959426980867},{"text":"un grupo de personas sentadas frente a una mesa","confidence":0.6184358785339179},{"text":"un grupo de personas sentadas a la mesa","confidence":0.6174358785339179}]},"requestId":"134cdbaf-c937-4258-bc9e-bc423e4caceb","metadata":{"width":1620,"height":1080,"format":"Jpeg"}}';
				break;
			case 'ja':
				json = '{"description":{"tags":["人","民衆","屋内","グループ","女性","探す","座る","立つ","写真","男","フロント","テーブル","若い","持つ","女の子","食品","キッチン","部屋","電話","再生","コンピュータ","シャツ"],"captions":[]},"requestId":"3f99521a-c5fd-43dc-9d73-c311dffad351","metadata":{"width":1620,"height":1080,"format":"Jpeg"}}';
				break;
			case 'pt':
				json = '{"description":{"tags":["pessoa","pessoas","no interior","grupo","mulher","olhando","em pé","foto","homem","frente","mesa","jovem","segurando","menina","comida","cozinha","quarto","telefone","jogando","computador","camisa"],"captions":[{"text":"grupo de pessoas olhando para a câmera","confidence":0.7468989098503169},{"text":"grupo de pessoas lado a lado olhando para a câmera","confidence":0.7150583060273981},{"text":"grupo de pessoas sentadas ao redor de uma mesa","confidence":0.6780983122880834},{"text":"grupo de pessoas sentadas","confidence":0.6770983122880834},{"text":"pessoas olhando para a câmera","confidence":0.6760983122880834},{"text":"grupo de pessoas tirando selfie","confidence":0.6689195924419923},{"text":"grupo de pessoas posando para foto","confidence":0.6679195924419923},{"text":"grupo de pessoas ao lado de uma pessoa","confidence":0.6462713575457326},{"text":"pessoas sentadas ao redor de uma mesa","confidence":0.6452713575457326},{"text":"grupo de pessoas olhando para o lado","confidence":0.6442713575457326},{"text":"grupo de pessoas sentadas ao redor de mesa","confidence":0.630767584459535},{"text":"grupo de pessoas lado a lado","confidence":0.629767584459535},{"text":"grupo de pessoas sentadas em volta de uma mesa","confidence":0.628767584459535},{"text":"grupo de pessoas posando para uma foto","confidence":0.627767584459535},{"text":"pessoas reunidas numa sala","confidence":0.626767584459535}]},"requestId":"b18ce3f5-5c83-4c82-9981-6a587fccaf87","metadata":{"width":1620,"height":1080,"format":"Jpeg"}}';
				break;
			case 'zh':
				json = '{"description":{"tags":["人","人们","室内","一群","女人","看着","站","照片","男人","前","桌子","年轻","女孩","食物","厨房","房间","电话","播放","电脑","衬衫"],"captions":[{"text":"一群人正在打电话","confidence":0.6295932305096852},{"text":"一群人看着人","confidence":0.6285932305096852},{"text":"一群人正在聊天","confidence":0.6275932305096852}]},"requestId":"5c1e044b-e7cb-46a7-abd3-6019a3826b00","metadata":{"width":1620,"height":1080,"format":"Jpeg"}}';
				break;
			default:
				json = '{"description":{"tags":[],"captions":[{"text":"","confidence":1.0}]},"requestId":"216fbedb-b3ad-42c4-a359-30442f4eb4dc","metadata":{"width":1620,"height":1080,"format":"Jpeg"}}';
				break;
		}

		return json;
	}

	private showDescribe() {
		if (this.state.showDescribeResult) {
			return <DescribeResult imageUrl={this.props.imageUrl} describeRequest={this.state.describeRequest} requestUrl={this.state.describeRequestUrl} describeJson={this.state.describeJson} />
		}
	}

}


export default DescribeComponent