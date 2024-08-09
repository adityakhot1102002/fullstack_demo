const express = require('express');
const bodyParser = require('body-parser');
const request = require('supertest');
const weatherRoute = require('../routes/weather'); // Adjust path as necessary

const app = express();
app.use(bodyParser.json());
app.use('/', weatherRoute);

describe('POST /', () => {
    it('should return weather data for a valid city', async () => {
        const response = await request(app)
            .post('/')
            .send({
                cityName: 'Bengaluru',
                unit: 'Celcius'
            });

        expect(response.status).toBe(200);
        expect(response.text).toContain('The weather is');
        expect(response.text).toContain('degree Celsius in');
    });

    it('should handle errors from the API gracefully', async () => {
        const response = await request(app)
            .post('/')
            .send({
                cityName: 'InvalidCityName',
                unit: 'metric'
            });

        expect(response.status).toBe(500);
        expect(response.text).toContain('Error fetching weather data.');
    });
});
