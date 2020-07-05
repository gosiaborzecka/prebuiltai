import * as React from 'react';
import { IDescribeRequest } from './IDescribeRequest';
import ReactJson from 'react-json-view';

import styles from './describe.module.scss';

interface IDescribeResult {
    describeJson: object;
    imageUrl: string;
    requestUrl: string;
    describeRequest: IDescribeRequest
}

const compTitle = 'Describe';

class DescribeResult extends React.Component<IDescribeResult, {}> {

    public render() {
        return (
            <>
                <div className={styles.describe}>
                    <div className={styles.title}><h2>{compTitle}</h2></div>
                    <br />
                    <div className={styles.url}>Request: {this.props.requestUrl}</div>
                    <br />
                    <div className={styles.json}>
                        <br />
                        {this.props.describeRequest.description.captions.map((el, i) => {
                            return (<div key={i}>
                                <div className={styles.text}>Description: </div>{el.text} <br />
                                <div className={styles.text}>Confidence: </div>{Math.floor(parseFloat(el.confidence) * 100)}%
                                <br />
                            </div>)
                        })}
                    </div>
                    <br />
                    <div className={styles.json}>
                        <div className={styles.text}>Tags:</div>
                        <ul>
                            {this.props.describeRequest.description.tags.map((el, i) => {
                                return <li key={i} className={styles.list}>{el} </li>
                            })}
                        </ul>
                    </div>
                    <div className={styles.json}>
                        <div className={styles.text}>Plain JSON</div>
                        <ReactJson src={this.props.describeJson} />
                    </div>
                </div>
            </>
        );
    }
}

export default DescribeResult
