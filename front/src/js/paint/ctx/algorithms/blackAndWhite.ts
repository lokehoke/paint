'use strict';

export enum Mode {
    average = 'average',
};

export class BlackAndWhiteTransducer {
    static async as_do(d: ImageData, mode: Mode = Mode.average): Promise<void> {
        switch(mode) {
            case Mode.average:
                await this.as_average(d);
                break;
        }
    }

    static async as_average(d: ImageData): Promise<void> {
        let work = (i: number) => {
            let average: number = (d.data[i*4] + d.data[i*4+1] + d.data[i*4+2]) / 3;
            d.data[i*4    ] = average;
            d.data[i*4 + 1] = average;
            d.data[i*4 + 2] = average;
        }

        let l: number = d.height * d.width;
        for (let i: number = 0; i < l; ++i) {
            work(i);
            if (i % 100000 === 0) {
                await new Promise(res => {
                    setTimeout(res);
                });
            }
        }
    }

}