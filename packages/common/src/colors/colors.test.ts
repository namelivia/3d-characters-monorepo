import { getRandomColor } from './colors'
describe('test color utils', () => {
    it('should get a random color', () => {
        expect(getRandomColor() > 0).toBeTruthy()
    })
})
