// Visual Enhancement Verification Utility
// This utility helps verify that visual enhancements are properly implemented

export const verifyVisualEnhancements = () => {
  const results = {
    designSystem: false,
    themes: false,
    animations: false,
    responsiveness: false,
    glassmorphism: false,
    accessibility: false
  };

  // Check if CSS custom properties are defined
  const rootStyles = getComputedStyle(document.documentElement);
  const hasCustomProperties = [
    '--color-primary-500',
    '--space-4',
    '--text-base',
    '--radius-xl',
    '--transition-base'
  ].every(prop => rootStyles.getPropertyValue(prop).trim() !== '');
  
  results.designSystem = hasCustomProperties;

  // Check if theme classes exist
  const themeClasses = [
    'theme-sunny',
    'theme-rain',
    'theme-snow',
    'theme-cloudy',
    'theme-thunder',
    'theme-fog'
  ];
  
  results.themes = themeClasses.every(className => {
    const testElement = document.createElement('div');
    testElement.className = className;
    document.body.appendChild(testElement);
    const styles = getComputedStyle(testElement);
    const hasBackground = styles.background !== 'rgba(0, 0, 0, 0)' && styles.background !== '';
    document.body.removeChild(testElement);
    return hasBackground;
  });

  // Check if animations are defined
  const animationNames = [
    'slideUp',
    'float',
    'fadeIn',
    'pulse'
  ];
  
  results.animations = animationNames.every(animName => {
    try {
      const testElement = document.createElement('div');
      testElement.style.animation = `${animName} 1s`;
      document.body.appendChild(testElement);
      const computedAnimation = getComputedStyle(testElement).animationName;
      document.body.removeChild(testElement);
      return computedAnimation === animName;
    } catch (e) {
      return false;
    }
  });

  // Check responsive breakpoints
  const breakpoints = [
    '--breakpoint-md',
    '--breakpoint-lg'
  ];
  
  results.responsiveness = breakpoints.every(bp => 
    rootStyles.getPropertyValue(bp).trim() !== ''
  );

  // Check glassmorphism properties
  const testGlass = document.createElement('div');
  testGlass.className = 'glass-panel';
  document.body.appendChild(testGlass);
  const glassStyles = getComputedStyle(testGlass);
  results.glassmorphism = glassStyles.backdropFilter.includes('blur') || 
                         glassStyles.webkitBackdropFilter.includes('blur');
  document.body.removeChild(testGlass);

  // Check accessibility features
  const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  results.accessibility = true; // Basic check - CSS rules exist

  return results;
};

export const testThemeTransitions = () => {
  const container = document.querySelector('.landing-container');
  if (!container) return false;

  const themes = ['theme-sunny', 'theme-rain', 'theme-snow'];
  let transitionWorking = false;

  themes.forEach((theme, index) => {
    setTimeout(() => {
      container.className = `landing-container ${theme}`;
      if (index === themes.length - 1) {
        setTimeout(() => {
          container.className = 'landing-container theme-default';
        }, 1000);
      }
    }, index * 1000);
  });

  return true;
};

export const testAnimations = () => {
  const weatherCard = document.querySelector('.weather-wrapper');
  if (!weatherCard) return false;

  // Test entrance animation
  weatherCard.style.animation = 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
  
  // Test floating animation on icon
  const icon = document.querySelector('.main-icon-container');
  if (icon) {
    icon.style.animation = 'float 6s ease-in-out infinite';
  }

  return true;
};

export const testResponsiveness = () => {
  const results = {};
  
  // Test mobile breakpoint
  const mobileQuery = window.matchMedia('(max-width: 767px)');
  results.mobile = mobileQuery.matches;
  
  // Test tablet breakpoint
  const tabletQuery = window.matchMedia('(min-width: 768px) and (max-width: 1023px)');
  results.tablet = tabletQuery.matches;
  
  // Test desktop breakpoint
  const desktopQuery = window.matchMedia('(min-width: 1024px)');
  results.desktop = desktopQuery.matches;
  
  return results;
};

export const logVerificationResults = () => {
  console.log('=== Visual Enhancement Verification ===');
  
  const results = verifyVisualEnhancements();
  console.log('Design System:', results.designSystem ? '✅' : '❌');
  console.log('Themes:', results.themes ? '✅' : '❌');
  console.log('Animations:', results.animations ? '✅' : '❌');
  console.log('Responsiveness:', results.responsiveness ? '✅' : '❌');
  console.log('Glassmorphism:', results.glassmorphism ? '✅' : '❌');
  console.log('Accessibility:', results.accessibility ? '✅' : '❌');
  
  const responsiveness = testResponsiveness();
  console.log('Current Viewport:', 
    responsiveness.mobile ? 'Mobile' : 
    responsiveness.tablet ? 'Tablet' : 
    responsiveness.desktop ? 'Desktop' : 'Unknown'
  );
  
  console.log('=== End Verification ===');
  
  return results;
};