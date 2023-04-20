import { Snackbar, Alert, AlertColor } from '@mui/material';
import React, { createContext, useContext, useState } from 'react';

type AlertData = {
  type: AlertColor;
  message: string;
};

type SnackbarPanelProps = {
  children: React.ReactNode;
};

type AlertCreator = (alertData: AlertData) => void;

const SnackbarContext = createContext<AlertCreator | null>(null);

export const SnackbarPanel = ({ children }: SnackbarPanelProps) => {
  const [alertsData, setAlertsData] = useState<AlertData[]>([]);

  const addNewAlert = (alertData: AlertData) => {
    setAlertsData((data) => data.concat(alertData));
  };
  const removeAlert = (message: string) => {
    setAlertsData((data) => data.filter((alert) => alert.message !== message));
  };

  return (
    <SnackbarContext.Provider value={addNewAlert}>
      {children}
      {alertsData.map(({ message, type }) => (
        <Snackbar
          open={true}
          autoHideDuration={6000}
          onClose={() => removeAlert(message)}
          key={message}
        >
          <Alert onClose={() => removeAlert(message)} severity={type} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      ))}
    </SnackbarContext.Provider>
  );
};

export const useAlerts = () => {
  const addNewAlert = useContext(SnackbarContext) as AlertCreator;
  return addNewAlert;
};
