// global.d.ts
interface Navigator {
  bluetooth: {
    requestDevice(options: RequestDeviceOptions): Promise<BluetoothDevice>;
  };
}

interface BluetoothDevice {
  gatt?: BluetoothRemoteGATTServer;
  name?: string;
}

interface BluetoothRemoteGATTServer {
  connect(): Promise<BluetoothRemoteGATTServer>;
  getPrimaryService(service: string | number): Promise<BluetoothRemoteGATTService>;
}

interface BluetoothRemoteGATTService {
  getCharacteristic(characteristic: string | number): Promise<BluetoothRemoteGATTCharacteristic>;
}

interface BluetoothRemoteGATTCharacteristic extends EventTarget {
  value: DataView;
  startNotifications(): Promise<void>;
  addEventListener(
    type: 'characteristicvaluechanged',
    listener: (this: BluetoothRemoteGATTCharacteristic, ev: Event) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
}
