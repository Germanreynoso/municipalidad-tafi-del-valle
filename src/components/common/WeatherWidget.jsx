import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Sun, Cloud, CloudRain, CloudLightning, Wind, Thermometer, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WeatherWidget() {
  const { t } = useTranslation('home');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        // Coordenadas de Tafí del Valle
        const lat = -26.8529;
        const lon = -65.7094;
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&timezone=auto`
        );
        const data = await response.json();
        setWeather(data.current);
      } catch (error) {
        console.error("Error fetching weather:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
    // Actualizar cada 30 minutos
    const interval = setInterval(fetchWeather, 1800000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (code) => {
    if (code <= 1) return <Sun className="text-yellow-400" size={24} />;
    if (code <= 3) return <Cloud className="text-stone-300" size={24} />;
    if (code <= 65) return <CloudRain className="text-sky-400" size={24} />;
    return <CloudLightning className="text-purple-400" size={24} />;
  };

  if (loading) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-6 px-6 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl"
    >
      {/* Clima */}
      <div className="flex items-center gap-3 pr-6 border-r border-white/10">
        {getWeatherIcon(weather?.weather_code)}
        <div>
          <p className="text-2xl font-black text-white leading-none">
            {Math.round(weather?.temperature_2m)}°C
          </p>
          <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mt-1">
            Tafí del Valle
          </p>
        </div>
      </div>

      {/* Detalles */}
      <div className="hidden sm:flex items-center gap-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-white/80">
            <Wind size={14} className="text-sky-300" />
            <span className="text-xs font-bold uppercase tracking-wider">{weather?.wind_speed_10m} km/h</span>
          </div>
          <span className="text-[9px] text-white/40 font-bold uppercase mt-0.5">{t('weather.wind')}</span>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-white/80">
            <MapPin size={14} className="text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider">{t('weather.status')}</span>
          </div>
          <span className="text-[9px] text-white/40 font-bold uppercase mt-0.5">{t('weather.route')}</span>
        </div>
      </div>
    </motion.div>
  );
}
