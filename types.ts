
import React from 'react';

export type ScreenId = 
  | 'splash_screen' 
  | 'login'
  | 'role_selection' 
  | 'user_home' 
  | 'catalog_search' 
  | 'search_results' 
  | 'technical_enquiry'
  | 'my_enquiries'
  | 'favorites'
  | 'dealer_locator'
  | 'my_garage'
  | 'user_profile';

export type UserRole = 'End User' | 'Reseller' | 'Distributor';

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: string;
  engine: string;
  isPrimary?: boolean;
}

export interface CompatibilityResult {
  id: string;
  name: string;
  partNumber: string;
  category: string;
  isCompatible: boolean;
  specs: {
    engine?: string;
    fuel?: string;
    drivetrain?: string;
  };
  exclusions?: string[];
  imageUrl?: string;
  details?: {
    frontPicto?: string;
    frontPremium?: string;
    frontExcel?: string;
    frontGasAJust?: string;
    frontMountingKit?: string;
    frontProtectionKit?: string;
    rearFittingType?: string;
    rearPremium?: string;
    rearExcelG?: string;
    rearGasAJust?: string;
    rearMountingKit?: string;
    rearProtectionKit?: string;
  };
}

export interface PartResult {
  id: string;
  vehicle: string;
  spec: string;
  year: string;
  type: 'Spark Plug' | 'Lambda Sensor' | 'Coil' | 'Glow Plug';
  partNumber: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}
