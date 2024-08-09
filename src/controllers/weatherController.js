const saveWeatherData = async (req, res) => {
  const { temperature, weatherDes, imageURL, cityName } = req.body;

  try {
    const db = getDb();
    if (!db) {
      return res.status(500).json({ message: 'Database connection error' });
    }
    const weatherCollection = db.collection('weatherData');

    const result = await weatherCollection.insertOne({
      temperature,
      weatherDes,
      imageURL,
      cityName,
    });

    res.status(201).json(result);
  } catch (error) {
    console.error('Error saving weather data:', error);
    res.status(400).json({ message: 'Error saving weather data', error });
  }
};