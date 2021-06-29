import { BaristaConfig, ScanConfig } from './configProvider';
import main from './index';

const mockBaristaConfig: BaristaConfig = {
    scan: {
        src: 'path',
        regex: '*'
    }
};

jest.mock('./configProvider', () => ({
    get() {
        return mockBaristaConfig;
    }
}));

jest.mock('./fs', () => ({
    scan(scfg: ScanConfig, cb: (files: string[]) => void) {
        return cb(['path1', 'path2']);
    }
}));

describe('test main', () => {
    it('should log config src', () => {
        jest.spyOn(console, 'log').mockImplementation();
        main();
        expect(console.log).toHaveBeenCalledWith(['path1', 'path2']);
    });
});
