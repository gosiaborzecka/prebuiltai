import { IDescribeRequest } from "./Describe/IDescribeRequest";

export interface IComputerVision {
	showSettings: boolean;
	showSettingsText: string;
	apiKey: string;
	endpoint: string;
	imageUrl: string;
	sampleData: boolean;
	describe: boolean;
	describeJson: object;
	describeRequest: IDescribeRequest,
	describeRequestUrl: string;
}