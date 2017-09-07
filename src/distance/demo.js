import React, { Component } from 'react';
import { Input, Button } from 'antd';
import 'antd/dist/antd.css';
import './demo.pcss';

export default class Demo extends Component {
    static Minimum = (a, b, c) => {
        return a < b ? (a < c ? a : c) : (b < c ? b : c);
    };

    static LevenshteinDistance = (v1, v2) => {
        const len1 = v1.length;
        const len2 = v2.length;
        const matrix = [];  // matrix
        let i;              // iterates through v1
        let j;              // iterates through v2
        let sIndex;         // ith character of v1
        let tIndex;         // jth character of v2
        let cost;           // cost

        // Step 1
        if (len1 === 0) return len2;
        if (len2 === 0) return len1;

        // Step 2
        for (i = 0; i <= len1; i++) {
            matrix[i] = [];
            matrix[i][0] = i;
        }

        for (j = 0; j <= len2; j++) {
            matrix[0][j] = j;
        }

        // Step 3
        for (i = 1; i <= len1; i++) {
            sIndex = v1.charAt(i - 1);
            for (j = 1; j <= len2; j++) {
                tIndex = v2.charAt(j - 1);
                if (sIndex === tIndex) {
                    cost = 0;
                } else {
                    cost = 1;
                }

                matrix[i][j] = Demo.Minimum(
                    matrix[i - 1][j] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j - 1] + cost,
                );
            }
        }

        // Step 4
        return matrix[len1][len2];
    };

    constructor() {
        super();
        this.state = {
            value1: '',
            value2: '',
            result: 0,
        };
    }

    handleClick = () => {
        const {
            value1,
            value2,
        } = this.state;

        const distance = Demo.LevenshteinDistance(value1, value2);
        const maxLength = value1.length > value2.length ? value1.length : value2.length;
        const result = (1 - (distance / maxLength)).toFixed(4);

        this.setState({
            distance,
            result,
        });
    };

    handleChange1 = (e) => {
        this.setState({
            value1: e.target.value,
        });
    };

    handleChange2 = (e) => {
        this.setState({
            value2: e.target.value,
        });
    };

    render() {
        const {
            value1,
            value2,
            distance,
            result,
        } = this.state;

        return (
            <div>
                <h3>Levenshtein Distance</h3>
                <Input
                    style={{ marginTop: '20px', width: '200px', display: 'block' }}
                    value={value1}
                    onChange={this.handleChange1}
                />
                <Input
                    style={{ marginTop: '20px', width: '200px', display: 'block' }}
                    value={value2}
                    onChange={this.handleChange2}
                />
                <Button style={{ marginTop: '20px' }} onClick={this.handleClick}>计算</Button>
                <p style={{ marginTop: '20px', fontSize: '18px' }}>最小编辑距离: {distance}</p>
                <p style={{ marginTop: '20px', fontSize: '18px' }}>相似度: {result}</p>
            </div>
        );
    }
}
