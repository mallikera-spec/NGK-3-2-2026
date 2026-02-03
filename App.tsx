
import React, { useState, useEffect } from 'react';
import { ScreenId, UserRole, Vehicle } from './types';
import SplashScreen from './screens/SplashScreen';
import Login from './screens/Login';
import RoleSelection from './screens/RoleSelection';
import UserProfile from './screens/UserProfile';
import MyGarage from './screens/MyGarage';

// Role-specific Logins
import DistributorLogin from './distributor/Login';
import ResellerLogin from './reseller/Login';

// Distributor Screens
import DHome from './distributor/Home';
import DCatalog from './distributor/CatalogSearch';
import DResults from './distributor/SearchResults';
import DEnquiries from './distributor/Enquiries';
import DFavorites from './distributor/Favorites';
import DDealers from './distributor/DealerLocator';
import DProfile from './distributor/Profile';

// Reseller Screens
import RHome from './reseller/Home';
import RCatalog from './reseller/CatalogSearch';
import RResults from './reseller/SearchResults';
import REnquiries from './reseller/Enquiries';
import RFavorites from './reseller/Favorites';
import RDealers from './reseller/DealerLocator';
import RProfile from './reseller/Profile';

// Standard Screens
import UserHome from './screens/UserHome';
import CatalogSearch from './screens/CatalogSearch';
import SearchResults from './screens/SearchResults';
import TechnicalEnquiry from './screens/TechnicalEnquiry';
import MyEnquiries from './screens/MyEnquiries';
import Favorites from './screens/Favorites';
import DealerLocator from './screens/DealerLocator';
import { Drawer } from './components/UI';

const App: React.FC = () => {
  const [screenStack, setScreenStack] = useState<ScreenId[]>(['splash_screen']);
  const [role, setRole] = useState<UserRole | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [garageVehicles, setGarageVehicles] = useState<Vehicle[]>([
    { id: 'v1', make: 'Audi', model: 'A3 Sportback', year: '2021', engine: '1.8L TFSI QUATTRO', isPrimary: true }
  ]);

  const [catalogState, setCatalogState] = useState({
    appType: 'Vehicle',
    manufacture: '',
    make: '',
    model: '',
    currentStep: 1,
    searchMode: 'vehicle',
    partNumber: ''
  });

  const currentScreen = screenStack[screenStack.length - 1];

  useEffect(() => {
    if (currentScreen === 'splash_screen') {
      const timer = setTimeout(() => {
        navigateTo('role_selection');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const navigateTo = (screen: ScreenId) => {
    if (screen === 'user_home') {
      setScreenStack(['user_home']);
    } else {
      setScreenStack(prev => [...prev, screen]);
    }
  };

  const goBack = () => {
    if (screenStack.length > 1) {
      setScreenStack(prev => prev.slice(0, -1));
    }
  };

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    navigateTo('login');
  };

  const handleLogout = () => {
    setRole(null);
    setIsDrawerOpen(false);
    localStorage.removeItem('user_role');
    setScreenStack(['splash_screen']);
  };

  const renderScreen = () => {
    const commonHeaderProps = {
      onProfile: () => navigateTo('user_profile'),
      onOpenMenu: () => setIsDrawerOpen(true),
    };

    switch (currentScreen) {
      case 'splash_screen': return <SplashScreen />;
      case 'role_selection': return <RoleSelection onSelectRole={handleRoleSelect} />;
      case 'login':
        if (role === 'Distributor') return <DistributorLogin onLoginSuccess={() => navigateTo('user_home')} />;
        if (role === 'Reseller') return <ResellerLogin onLoginSuccess={() => navigateTo('user_home')} />;
        return <Login role={role} onLoginSuccess={() => navigateTo('user_home')} />;
      
      case 'user_home':
        if (role === 'Distributor') return <DHome onNavigate={navigateTo} onOpenMenu={commonHeaderProps.onOpenMenu} onProfile={commonHeaderProps.onProfile} />;
        if (role === 'Reseller') return <RHome onNavigate={navigateTo} onOpenMenu={commonHeaderProps.onOpenMenu} onProfile={commonHeaderProps.onProfile} />;
        return <UserHome onNavigate={navigateTo} role={role} onOpenMenu={commonHeaderProps.onOpenMenu} onProfile={commonHeaderProps.onProfile} primaryVehicle={garageVehicles.find(v => v.isPrimary)} />;

      case 'catalog_search':
        if (role === 'Distributor') return <DCatalog onNavigate={navigateTo} onBack={goBack} state={catalogState} setState={setCatalogState} onProfile={commonHeaderProps.onProfile} />;
        if (role === 'Reseller') return <RCatalog onNavigate={navigateTo} onBack={goBack} state={catalogState} setState={setCatalogState} onProfile={commonHeaderProps.onProfile} />;
        return <CatalogSearch onNavigate={navigateTo} onBack={goBack} state={catalogState} setState={setCatalogState} onProfile={commonHeaderProps.onProfile} />;

      case 'search_results':
        const activeLabel = catalogState.searchMode === 'part' ? `Part: ${catalogState.partNumber}` : (catalogState.manufacture + ' ' + catalogState.make);
        if (role === 'Distributor') return <DResults onNavigate={navigateTo} onBack={goBack} activeVehicle={activeLabel} onProfile={commonHeaderProps.onProfile} />;
        if (role === 'Reseller') return <RResults onNavigate={navigateTo} onBack={goBack} activeVehicle={activeLabel} onProfile={commonHeaderProps.onProfile} />;
        return <SearchResults onNavigate={navigateTo} onBack={goBack} activeVehicle={activeLabel} onProfile={commonHeaderProps.onProfile} />;

      case 'my_enquiries':
        if (role === 'Distributor') return <DEnquiries onNavigate={navigateTo} onBack={goBack} onProfile={commonHeaderProps.onProfile} />;
        if (role === 'Reseller') return <REnquiries onNavigate={navigateTo} onBack={goBack} onProfile={commonHeaderProps.onProfile} />;
        return <MyEnquiries onNavigate={navigateTo} onBack={goBack} onProfile={commonHeaderProps.onProfile} />;

      case 'favorites':
        if (role === 'Distributor') return <DFavorites onNavigate={navigateTo} onBack={goBack} onProfile={commonHeaderProps.onProfile} />;
        if (role === 'Reseller') return <RFavorites onNavigate={navigateTo} onBack={goBack} onProfile={commonHeaderProps.onProfile} />;
        return <Favorites onNavigate={navigateTo} onBack={goBack} onProfile={commonHeaderProps.onProfile} />;

      case 'dealer_locator':
        if (role === 'Distributor') return <DDealers onBack={goBack} onProfile={commonHeaderProps.onProfile} />;
        if (role === 'Reseller') return <RDealers onBack={goBack} onProfile={commonHeaderProps.onProfile} />;
        return <DealerLocator onBack={goBack} onProfile={commonHeaderProps.onProfile} />;

      case 'user_profile':
        if (role === 'Distributor') return <DProfile onBack={goBack} onLogout={handleLogout} onNavigate={navigateTo} />;
        if (role === 'Reseller') return <RProfile onBack={goBack} onLogout={handleLogout} onNavigate={navigateTo} />;
        return <UserProfile onBack={goBack} role={role} onLogout={handleLogout} onNavigate={navigateTo} />;

      case 'my_garage': return <MyGarage vehicles={garageVehicles} setVehicles={setGarageVehicles} onBack={goBack} onNavigate={navigateTo} />;
      case 'technical_enquiry': return <TechnicalEnquiry onNavigate={navigateTo} onBack={goBack} onProfile={commonHeaderProps.onProfile} />;
      default: return <UserHome onNavigate={navigateTo} role={role} onOpenMenu={commonHeaderProps.onOpenMenu} onProfile={commonHeaderProps.onProfile} primaryVehicle={garageVehicles[0]} />;
    }
  };

  return (
    <div className="h-screen w-full max-w-md bg-white shadow-2xl relative overflow-hidden flex flex-col mx-auto md:border-x border-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden safe-area-padding-top safe-area-padding-bottom relative">
        {renderScreen()}
        <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} onNavigate={navigateTo} onLogout={handleLogout} role={role} />
      </div>
    </div>
  );
};

export default App;
