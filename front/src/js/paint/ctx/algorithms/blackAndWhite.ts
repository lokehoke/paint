'use strict';

export enum EBlackAndWhiteMode {
    average = 'average',
}

export class BlackAndWhiteTransducer {
    static async do(d: ImageData, mode: EBlackAndWhiteMode = EBlackAndWhiteMode.average): Promise<void> {
        switch (mode) {
            case EBlackAndWhiteMode.average:
                await this.average(d);
                break;
        }
    }

    static async average(d: ImageData): Promise<void> {
        const work = (i: number): void => {
            const average: number = (d.data[i * 4] + d.data[i * 4 + 1] + d.data[i * 4 + 2]) / 3;
            d.data[i * 4] = average;
            d.data[i * 4 + 1] = average;
            d.data[i * 4 + 2] = average;
        };

        const l: number = d.height * d.width;
        for (let i = 0; i < l; ++i) {
            work(i);
            if (i % 100000 === 0) {
                await new Promise((res) => {
                    setTimeout(res);
                });
            }
        }
    }
}
