export interface IDescribeRequest {
	description: {
		tags: string[];
		captions: ICaptions[];
	};
}

export interface ICaptions{
    text: string;
    confidence: string;
}
