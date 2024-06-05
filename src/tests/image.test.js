const request = require('supertest');
const app = require('../app');
const { uploadToCloudinary } = require('../utils/cloudinary');

describe('POST /images', () => {
    it('should upload an image successfully', async () => {
        const imageFile = {
            fieldname: 'image',
            originalname: 'test-image.jpg',
            mimetype: 'image/jpeg',
            buffer: Buffer.from('Fake image data'),
        };

        jest.mock('../utils/cloudinary', () => ({
            uploadToCloudinary: jest.fn().mockResolvedValue({ url: 'https://fakeurl.com/image.jpg' }),
        }));

        const response = await request(app)
            .post('/images')
            .attach('image', imageFile.buffer, 'test-image.jpg');


        expect(response.status).toBe(201);

      
        expect(response.body).toHaveProperty('url');
        expect(typeof response.body.url).toBe('string');

        
        expect(uploadToCloudinary).toHaveBeenCalledWith(imageFile);
    });
});
