import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import weatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  try {
   const response = await weatherService.getWeatherForCity(req.body.cityName);
   HistoryService.addCity(req.body.cityName);
    res.json(response)
  }
  catch (error) {
    res.json(error)
  }
  // TODO: GET weather data from city name
  // TODO: save city to search history
  
});

// TODO: GET search history
router.get('/history', async (_req, _res) => {
  HistoryService.getCities().then((data) => {
    return _res.json(data);
  }).catch((err) => {
    _res.status(500).json(err);
  })
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (_req, _res) => {
  if (_req.params.id) {
    HistoryService.removeCity(_req.params.id).then(() => {
      return _res.json({ success: "City removed"});
    }).catch((err) => {
      _res.status(500).json(err);
    })
  } else {
    _res.status(400).json({ message: "You did not enter an id"});
  }
});

export default router;


// im going to smile :) ahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh 