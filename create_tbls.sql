CREATE TABLE temperature_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  hypothermia DECIMAL(4, 1),
  mild_hypothermia DECIMAL(4, 1),
  normal DECIMAL(4, 1),
  mild_fever DECIMAL(4, 1),
  fever DECIMAL(4, 1),
  hyperpyrexia DECIMAL(4, 1)
);

INSERT INTO temperature_settings (
  hypothermia,
  mild_hypothermia,
  normal_high,
  mild_fever,
  fever,
  hyperpyrexia
) VALUES (
  35,
  36.5,
  37.5,
  38,
  40,
  40
);
