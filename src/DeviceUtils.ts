import {Dimensions, Platform, ScaledSize} from 'react-native';
import * as DeviceInfo from 'react-native-device-info';

export class DeviceUtils {
  static getCountry(): string {
    return DeviceInfo.getDeviceCountry();
  }

  static getModel(): string {
    return DeviceInfo.getModel();
  }

  static getScale(): number {
    const windowSize: ScaledSize = Dimensions.get('window');
    const scale: number = windowSize.height / 667;
    return scale > 1 ? 1 : +(scale.toFixed(1));
  }

  static getTimezone(): string {
    return DeviceInfo.getTimezone();
  }

  static isTablet(): boolean {
    return DeviceInfo.isTablet();
  }

  static isAndroid(): boolean {
    return DeviceUtils.os() === 'android';
  }

  static isIOS(): boolean {
    return DeviceUtils.os() === 'ios';
  }

  static isIPhoneX(): boolean {
    const xWidth: number = 375;
    const xHeight: number = 812;
    const {height, width} = Dimensions.get('window');

    return (
      DeviceUtils.isIOS && (
        (height === xHeight && width === xWidth) || (height === xWidth && width === xHeight)
      )
    );
  }

  static os(): string {
    return Platform.OS;
  }
}
