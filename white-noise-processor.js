class WhiteNoiseProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.noiseType = 'white';
        this.port.onmessage = (e) => {
            if (e.data.type) {
                this.noiseType = e.data.type;
            }
        };
    }

    process(inputs, outputs) {
        const output = outputs[0];
        for (let channel = 0; channel < output.length; ++channel) {
            const sample = output[channel];
            for (let i = 0; i < sample.length; ++i) {
                // Generate different noise types
                switch(this.noiseType) {
                    case 'white':
                        sample[i] = Math.random() * 2 - 1;
                        break;
                    case 'pink':
                        // Simplified pink noise
                        sample[i] = (Math.random() * 2 - 1) * 0.5;
                        break;
                    case 'brown':
                        // Simplified brown noise
                        sample[i] = (Math.random() * 2 - 1) * 0.25;
                        break;
                    case 'rain':
                        // Simplified rain sound
                        sample[i] = (Math.random() * 2 - 1) * 0.3;
                        break;
                    default:
                        sample[i] = Math.random() * 2 - 1;
                }
            }
        }
        return true;
    }
}
registerProcessor('white-noise-processor', WhiteNoiseProcessor);
