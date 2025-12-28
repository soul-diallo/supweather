// Accessibility utilities for testing color contrast and other accessibility features

/**
 * Calculate relative luminance of a color
 * @param {number} r - Red component (0-255)
 * @param {number} g - Green component (0-255)
 * @param {number} b - Blue component (0-255)
 * @returns {number} Relative luminance (0-1)
 */
function getRelativeLuminance(r, g, b) {
  // Convert to 0-1 range
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Parse CSS color string to RGB values
 * @param {string} color - CSS color string
 * @returns {Object|null} RGB object or null if parsing fails
 */
function parseColor(color) {
  // Create a temporary element to get computed color
  const div = document.createElement('div');
  div.style.color = color;
  document.body.appendChild(div);
  
  const computedColor = getComputedStyle(div).color;
  document.body.removeChild(div);
  
  // Parse rgb() or rgba() format
  const match = computedColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
  if (match) {
    return {
      r: parseInt(match[1]),
      g: parseInt(match[2]),
      b: parseInt(match[3])
    };
  }
  
  return null;
}

/**
 * Calculate contrast ratio between two colors
 * @param {string} color1 - First color (CSS format)
 * @param {string} color2 - Second color (CSS format)
 * @returns {number} Contrast ratio (1-21)
 */
export function calculateContrastRatio(color1, color2) {
  const rgb1 = parseColor(color1);
  const rgb2 = parseColor(color2);
  
  if (!rgb1 || !rgb2) {
    console.warn('Could not parse colors:', color1, color2);
    return 0;
  }
  
  const l1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast ratio meets WCAG AA standards
 * @param {number} ratio - Contrast ratio
 * @param {string} level - 'AA' or 'AAA'
 * @param {string} size - 'normal' or 'large'
 * @returns {boolean} Whether the ratio meets the standard
 */
export function meetsWCAGStandard(ratio, level = 'AA', size = 'normal') {
  const thresholds = {
    'AA': { normal: 4.5, large: 3.0 },
    'AAA': { normal: 7.0, large: 4.5 }
  };
  
  return ratio >= thresholds[level][size];
}

/**
 * Test color contrast for all text/background combinations in the app
 * @returns {Object} Test results with pass/fail status
 */
export function testColorContrast() {
  const results = {
    passed: [],
    failed: [],
    warnings: []
  };
  
  // Test combinations for different themes
  const themes = [
    'theme-default',
    'theme-sunny', 
    'theme-night-clear',
    'theme-cloudy',
    'theme-night-cloudy',
    'theme-rain',
    'theme-snow',
    'theme-thunder',
    'theme-fog'
  ];
  
  themes.forEach(theme => {
    // Create test container with theme
    const container = document.createElement('div');
    container.className = `landing-container ${theme}`;
    document.body.appendChild(container);
    
    // Test search box text
    const searchBox = document.createElement('div');
    searchBox.className = 'search-box';
    container.appendChild(searchBox);
    
    const title = document.createElement('h1');
    title.textContent = 'Test Title';
    searchBox.appendChild(title);
    
    const subtitle = document.createElement('p');
    subtitle.textContent = 'Test subtitle';
    searchBox.appendChild(subtitle);
    
    // Test weather card text
    const weatherCard = document.createElement('div');
    weatherCard.className = 'weather-wrapper';
    container.appendChild(weatherCard);
    
    const glassPanel = document.createElement('div');
    glassPanel.className = 'glass-panel';
    weatherCard.appendChild(glassPanel);
    
    const tempValue = document.createElement('h1');
    tempValue.className = 'temp-value';
    tempValue.textContent = '72°';
    glassPanel.appendChild(tempValue);
    
    const weatherDesc = document.createElement('span');
    weatherDesc.className = 'weather-desc';
    weatherDesc.textContent = 'Partly Cloudy';
    glassPanel.appendChild(weatherDesc);
    
    // Test detail items
    const detailItem = document.createElement('div');
    detailItem.className = 'detail-item';
    glassPanel.appendChild(detailItem);
    
    const detailValue = document.createElement('span');
    detailValue.className = 'value';
    detailValue.textContent = '65%';
    detailItem.appendChild(detailValue);
    
    const detailLabel = document.createElement('span');
    detailLabel.className = 'label';
    detailLabel.textContent = 'Humidity';
    detailItem.appendChild(detailLabel);
    
    // Test error messages
    const errorMsg = document.createElement('div');
    errorMsg.className = 'error-message';
    errorMsg.textContent = 'City not found';
    searchBox.appendChild(errorMsg);
    
    // Get computed styles and test contrasts
    const containerStyles = getComputedStyle(container);
    const searchBoxStyles = getComputedStyle(searchBox);
    const titleStyles = getComputedStyle(title);
    const subtitleStyles = getComputedStyle(subtitle);
    const glassPanelStyles = getComputedStyle(glassPanel);
    const tempStyles = getComputedStyle(tempValue);
    const descStyles = getComputedStyle(weatherDesc);
    const detailValueStyles = getComputedStyle(detailValue);
    const detailLabelStyles = getComputedStyle(detailLabel);
    const errorStyles = getComputedStyle(errorMsg);
    
    // Test title contrast
    const titleRatio = calculateContrastRatio(
      titleStyles.color,
      searchBoxStyles.backgroundColor
    );
    const titleTest = {
      element: `${theme} - Search Title`,
      ratio: titleRatio,
      passes: meetsWCAGStandard(titleRatio, 'AA', 'large'),
      colors: {
        text: titleStyles.color,
        background: searchBoxStyles.backgroundColor
      }
    };
    
    if (titleTest.passes) {
      results.passed.push(titleTest);
    } else {
      results.failed.push(titleTest);
    }
    
    // Test subtitle contrast
    const subtitleRatio = calculateContrastRatio(
      subtitleStyles.color,
      searchBoxStyles.backgroundColor
    );
    const subtitleTest = {
      element: `${theme} - Search Subtitle`,
      ratio: subtitleRatio,
      passes: meetsWCAGStandard(subtitleRatio, 'AA', 'normal'),
      colors: {
        text: subtitleStyles.color,
        background: searchBoxStyles.backgroundColor
      }
    };
    
    if (subtitleTest.passes) {
      results.passed.push(subtitleTest);
    } else {
      results.failed.push(subtitleTest);
    }
    
    // Test temperature contrast
    const tempRatio = calculateContrastRatio(
      tempStyles.color,
      glassPanelStyles.backgroundColor
    );
    const tempTest = {
      element: `${theme} - Temperature`,
      ratio: tempRatio,
      passes: meetsWCAGStandard(tempRatio, 'AA', 'large'),
      colors: {
        text: tempStyles.color,
        background: glassPanelStyles.backgroundColor
      }
    };
    
    if (tempTest.passes) {
      results.passed.push(tempTest);
    } else {
      results.failed.push(tempTest);
    }
    
    // Test weather description contrast
    const descRatio = calculateContrastRatio(
      descStyles.color,
      glassPanelStyles.backgroundColor
    );
    const descTest = {
      element: `${theme} - Weather Description`,
      ratio: descRatio,
      passes: meetsWCAGStandard(descRatio, 'AA', 'normal'),
      colors: {
        text: descStyles.color,
        background: glassPanelStyles.backgroundColor
      }
    };
    
    if (descTest.passes) {
      results.passed.push(descTest);
    } else {
      results.failed.push(descTest);
    }
    
    // Test detail value contrast
    const detailValueRatio = calculateContrastRatio(
      detailValueStyles.color,
      glassPanelStyles.backgroundColor
    );
    const detailValueTest = {
      element: `${theme} - Detail Value`,
      ratio: detailValueRatio,
      passes: meetsWCAGStandard(detailValueRatio, 'AA', 'normal'),
      colors: {
        text: detailValueStyles.color,
        background: glassPanelStyles.backgroundColor
      }
    };
    
    if (detailValueTest.passes) {
      results.passed.push(detailValueTest);
    } else {
      results.failed.push(detailValueTest);
    }
    
    // Test detail label contrast
    const detailLabelRatio = calculateContrastRatio(
      detailLabelStyles.color,
      glassPanelStyles.backgroundColor
    );
    const detailLabelTest = {
      element: `${theme} - Detail Label`,
      ratio: detailLabelRatio,
      passes: meetsWCAGStandard(detailLabelRatio, 'AA', 'normal'),
      colors: {
        text: detailLabelStyles.color,
        background: glassPanelStyles.backgroundColor
      }
    };
    
    if (detailLabelTest.passes) {
      results.passed.push(detailLabelTest);
    } else {
      results.failed.push(detailLabelTest);
    }
    
    // Test error message contrast
    const errorRatio = calculateContrastRatio(
      errorStyles.color,
      errorStyles.backgroundColor
    );
    const errorTest = {
      element: `${theme} - Error Message`,
      ratio: errorRatio,
      passes: meetsWCAGStandard(errorRatio, 'AA', 'normal'),
      colors: {
        text: errorStyles.color,
        background: errorStyles.backgroundColor
      }
    };
    
    if (errorTest.passes) {
      results.passed.push(errorTest);
    } else {
      results.failed.push(errorTest);
    }
    
    // Clean up
    document.body.removeChild(container);
  });
  
  return results;
}

/**
 * Check if an element has sufficient touch target size
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} Whether element meets touch target requirements
 */
export function checkTouchTargetSize(element) {
  const rect = element.getBoundingClientRect();
  const minSize = 44; // WCAG recommendation for touch targets
  
  return rect.width >= minSize && rect.height >= minSize;
}

/**
 * Check if an element has visible focus indicators
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} Whether element has visible focus indicators
 */
export function checkFocusIndicators(element) {
  // Simulate focus
  element.focus();
  
  const styles = getComputedStyle(element);
  const hasFocusOutline = styles.outline !== 'none' && styles.outline !== '';
  const hasFocusBoxShadow = styles.boxShadow !== 'none' && styles.boxShadow !== '';
  const hasFocusBorder = styles.borderColor !== 'transparent';
  
  // Remove focus
  element.blur();
  
  return hasFocusOutline || hasFocusBoxShadow || hasFocusBorder;
}

/**
 * Test keyboard navigation support
 * @returns {Object} Test results for keyboard navigation
 */
export function testKeyboardNavigation() {
  const results = {
    passed: [],
    failed: [],
    warnings: []
  };
  
  // Find all interactive elements
  const interactiveSelectors = [
    'button',
    'input',
    'a[href]',
    '[tabindex]:not([tabindex="-1"])',
    'select',
    'textarea'
  ];
  
  const interactiveElements = document.querySelectorAll(interactiveSelectors.join(', '));
  
  interactiveElements.forEach((element, index) => {
    const elementType = element.tagName.toLowerCase();
    const elementClass = element.className || 'no-class';
    const elementId = `${elementType}.${elementClass}[${index}]`;
    
    // Check if element is focusable
    const isFocusable = element.tabIndex >= 0 || ['input', 'button', 'select', 'textarea', 'a'].includes(elementType);
    
    // Check if element has visible focus indicators
    const hasFocusIndicators = checkFocusIndicators(element);
    
    // Check touch target size for mobile
    const hasValidTouchTarget = checkTouchTargetSize(element);
    
    const test = {
      element: elementId,
      focusable: isFocusable,
      focusIndicators: hasFocusIndicators,
      touchTarget: hasValidTouchTarget,
      passes: isFocusable && hasFocusIndicators && hasValidTouchTarget
    };
    
    if (test.passes) {
      results.passed.push(test);
    } else {
      results.failed.push(test);
    }
  });
  
  return results;
}

/**
 * Run comprehensive accessibility tests
 * @returns {Object} Complete accessibility test results
 */
export function runAccessibilityTests() {
  console.log('🔍 Running accessibility tests...');
  
  const results = {
    colorContrast: testColorContrast(),
    keyboardNavigation: testKeyboardNavigation(),
    timestamp: new Date().toISOString()
  };
  
  // Summary
  const totalTests = results.colorContrast.passed.length + results.colorContrast.failed.length +
                    results.keyboardNavigation.passed.length + results.keyboardNavigation.failed.length;
  const totalPassed = results.colorContrast.passed.length + results.keyboardNavigation.passed.length;
  const totalFailed = results.colorContrast.failed.length + results.keyboardNavigation.failed.length;
  
  results.summary = {
    total: totalTests,
    passed: totalPassed,
    failed: totalFailed,
    passRate: totalTests > 0 ? (totalPassed / totalTests * 100).toFixed(1) : 0
  };
  
  console.log(`✅ Accessibility Tests Complete: ${totalPassed}/${totalTests} passed (${results.summary.passRate}%)`);
  
  if (totalFailed > 0) {
    console.warn(`❌ ${totalFailed} accessibility issues found`);
    console.group('Failed Tests:');
    [...results.colorContrast.failed, ...results.keyboardNavigation.failed].forEach(test => {
      console.warn(`- ${test.element}: ${test.ratio ? `Contrast ${test.ratio.toFixed(2)}:1` : 'Accessibility issue'}`);
    });
    console.groupEnd();
  }
  
  return results;
}