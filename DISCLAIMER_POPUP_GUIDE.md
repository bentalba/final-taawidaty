# CNSS Disclaimer Popup - Implementation Guide

## Overview

The CNSS Disclaimer popup is a critical component that appears on a user's first visit to clarify that **taawidaty.ma is NOT affiliated with CNSS or any government entity**. This prevents confusion with the official CNSS Taawidaty portal.

## ✨ Features

### 1. **First Visit Only**
- Uses `localStorage` to track if user has seen the disclaimer
- Key: `hasSeenCNSSDisclaimer`
- Will not show again after user closes or redirects

### 2. **Bilingual Support**
- **French**: Full disclaimer text with professional warning
- **Arabic**: Complete RTL support with accurate translation
- Automatically switches based on user's language preference

### 3. **Clear Warning Design**
- **Red Title**: "AVIS IMPORTANT / CLAUSE DE NON-RESPONSABILITÉ"
- **Warning Icon**: Alert triangle icon for visual prominence
- **Professional Layout**: Glass-morphism design with backdrop blur

### 4. **Two Action Buttons**

#### Button 1: Redirect to Official CNSS
```typescript
"Aller au site officiel de la CNSS" (FR)
"الانتقال إلى الموقع الرسمي للضمان الاجتماعي" (AR)
```
- Opens official CNSS website in new tab: `https://www.cnss.ma`
- Marks disclaimer as seen
- Closes popup

#### Button 2: Stay on Site
```typescript
"Fermer et continuer sur ce site" (FR)
"الإغلاق والمتابعة في هذا الموقع" (AR)
```
- Closes popup
- Marks disclaimer as seen
- User continues on taawidaty.ma

## 📋 Component Structure

### File Location
```
src/components/ui/CNSSDisclaimer.tsx
```

### Integration
The component is imported and used in `src/pages/Index.tsx`:

```tsx
import { CNSSDisclaimer } from '@/components/ui/CNSSDisclaimer';

export default function Index() {
  return (
    <>
      <SEO {...} />
      
      {/* CNSS Disclaimer Popup - Shows on first visit */}
      <CNSSDisclaimer />
      
      <div>
        {/* Rest of the page content */}
      </div>
    </>
  );
}
```

## 🎨 Design Specifications

### Colors
- **Title**: Red (#DC2626) - `text-red-600 dark:text-red-400`
- **Background**: White with glass effect
- **Backdrop**: Black with 60% opacity + blur
- **Info Box**: Blue background for additional info

### Typography
- **Title**: 2xl font size, bold
- **Body Text**: Base font size, regular weight
- **Arabic**: Special `font-arabic` class for proper RTL

### Animations
- **Entry**: Fade in + scale up + slide up
- **Exit**: Fade out + scale down + slide down
- **Backdrop**: Smooth fade in/out
- **Duration**: 300ms for smooth transitions

### Responsive Behavior
- **Mobile (< 640px)**: Full-screen popup, stacked buttons
- **Desktop (≥ 640px)**: Centered dialog, side-by-side buttons
- **Max Width**: 2xl (672px)

## 🔧 Technical Details

### Dependencies
```json
{
  "react": "^18.3.1",
  "framer-motion": "^10.18.0",
  "lucide-react": "^0.462.0"
}
```

### State Management
```typescript
const [isOpen, setIsOpen] = useState(false);
```

### LocalStorage Logic
```typescript
// Check on mount
useEffect(() => {
  const hasSeenDisclaimer = localStorage.getItem('hasSeenCNSSDisclaimer');
  
  if (!hasSeenDisclaimer) {
    setTimeout(() => setIsOpen(true), 1000); // Show after 1 second
  }
}, []);

// Mark as seen
const handleClose = () => {
  localStorage.setItem('hasSeenCNSSDisclaimer', 'true');
  setIsOpen(false);
};
```

### Language Context
```typescript
const { language, isRTL } = useLanguage();
```

## 📝 Content

### French Version

**Title**: AVIS IMPORTANT / CLAUSE DE NON-RESPONSABILITÉ

**Message**: 
> Vous cherchez peut-être le portail officiel TAAWIDATY de la CNSS (Caisse Nationale de Sécurité Sociale) ?

**Disclaimer**:
> Veuillez noter que ce site web (taawidaty.ma) n'est PAS le site officiel et n'a AUCUNE affiliation avec la CNSS ou toute autre entité gouvernementale. Nous proposons des services distincts et indépendants.

**Info Box**:
> ℹ️ Pour être redirigé vers le site officiel de la CNSS, veuillez cliquer sur le bouton ci-dessous.

**Note**:
> Pour rester sur notre site, veuillez fermer cet avis.

### Arabic Version (RTL)

**Title**: إشعار هام وإخلاء مسؤولية

**Message**:
> هل تبحث عن البوابة الرسمية TAAWIDATY الخاصة بـ CNSS (الصندوق الوطني للضمان الاجتماعي)؟

**Disclaimer**:
> يرجى العلم أن هذا الموقع (taawidaty.ma) ليس الموقع الرسمي وليس له أي ارتباط أو انتماء بالصندوق الوطني للضمان الاجتماعي أو أي جهة حكومية أخرى. نحن نقدم خدمات مستقلة ومختلفة.

**Info Box**:
> ℹ️ للانتقال إلى الموقع الرسمي للصندوق الوطني للضمان الاجتماعي، يرجى النقر على الزر أدناه.

**Note**:
> للبقاء في موقعنا، يرجى إغلاق هذا الإشعار.

## 🧪 Testing Guide

### Test Scenario 1: First Visit
1. Clear browser localStorage or use incognito mode
2. Visit https://taawidaty.ma
3. **Expected**: Popup appears after 1 second
4. **Verify**: Red title, bilingual content, two buttons visible

### Test Scenario 2: Close Button
1. On first visit, click "Fermer et continuer"
2. **Expected**: Popup closes, localStorage set to 'true'
3. Refresh page
4. **Expected**: Popup does NOT appear again

### Test Scenario 3: CNSS Redirect
1. Clear localStorage
2. Visit site, wait for popup
3. Click "Aller au site officiel de la CNSS"
4. **Expected**: 
   - New tab opens with https://www.cnss.ma
   - Popup closes
   - localStorage set to 'true'

### Test Scenario 4: Language Switch
1. Clear localStorage
2. Visit site in French
3. **Verify**: French content displayed
4. Close popup
5. Clear localStorage again
6. Switch to Arabic
7. Visit site
8. **Verify**: Arabic content with proper RTL layout

### Test Scenario 5: Responsive Design
1. Clear localStorage
2. Test on mobile viewport (375px width)
3. **Verify**: 
   - Full-screen popup
   - Stacked buttons
   - Readable text
4. Test on desktop (1920px width)
5. **Verify**:
   - Centered dialog
   - Side-by-side buttons
   - Proper max-width

## 🔐 Privacy & Legal

### Purpose
- Clarify non-affiliation with government entities
- Prevent user confusion with official CNSS portal
- Provide easy access to official CNSS website
- Ensure transparency about service independence

### Data Collection
- **Only stored**: Boolean flag in localStorage
- **No tracking**: No analytics or external calls
- **No PII**: No personal information collected
- **User control**: Can clear localStorage anytime

### GDPR Compliance
- ✅ Minimal data collection
- ✅ User consent implicit (by closing popup)
- ✅ No cookies used for disclaimer
- ✅ Data stays local (localStorage only)

## 🛠️ Maintenance

### Updating Content
To update disclaimer text, edit the `content` object in `CNSSDisclaimer.tsx`:

```typescript
const content = {
  fr: {
    title: "...",
    message: "...",
    disclaimer: "...",
    // etc.
  },
  ar: {
    title: "...",
    message: "...",
    disclaimer: "...",
    // etc.
  }
};
```

### Changing CNSS URL
Update the `handleRedirect` function:

```typescript
const handleRedirect = () => {
  localStorage.setItem('hasSeenCNSSDisclaimer', 'true');
  window.open('https://www.cnss.ma', '_blank'); // Change URL here
  setIsOpen(false);
};
```

### Adjusting Delay
Change the timeout duration in the `useEffect`:

```typescript
setTimeout(() => {
  setIsOpen(true);
}, 1000); // Change to desired delay in milliseconds
```

### Resetting for Testing
To test the disclaimer again:

```javascript
// In browser console
localStorage.removeItem('hasSeenCNSSDisclaimer');
// Then refresh page
```

## 📊 Analytics Recommendations

Consider tracking (with user consent):
- How many users see the disclaimer
- How many click "Redirect to CNSS"
- How many click "Stay on site"
- Time to action (how long before user closes)

Example implementation (pseudo-code):
```typescript
const handleClose = () => {
  // Track event (if analytics enabled)
  trackEvent('disclaimer_closed', { action: 'stay_on_site' });
  
  localStorage.setItem('hasSeenCNSSDisclaimer', 'true');
  setIsOpen(false);
};

const handleRedirect = () => {
  // Track event (if analytics enabled)
  trackEvent('disclaimer_closed', { action: 'redirect_to_cnss' });
  
  localStorage.setItem('hasSeenCNSSDisclaimer', 'true');
  window.open('https://www.cnss.ma', '_blank');
  setIsOpen(false);
};
```

## 🚀 Deployment Checklist

- [x] Component created: `src/components/ui/CNSSDisclaimer.tsx`
- [x] Integrated in Index page
- [x] Bilingual content (FR/AR)
- [x] RTL support for Arabic
- [x] LocalStorage logic implemented
- [x] CNSS redirect button working
- [x] Close button working
- [x] Responsive design tested
- [x] Animations working smoothly
- [x] Committed to git
- [x] Pushed to dev branch

## 📚 Related Files

- **Component**: `src/components/ui/CNSSDisclaimer.tsx`
- **Integration**: `src/pages/Index.tsx`
- **Language Context**: `src/contexts/LanguageContext.tsx`
- **Translations**: Content is embedded in component (not in translations file)

## 🆘 Troubleshooting

### Issue: Popup not appearing
**Solution**: 
1. Check localStorage: `localStorage.getItem('hasSeenCNSSDisclaimer')`
2. Clear it: `localStorage.removeItem('hasSeenCNSSDisclaimer')`
3. Refresh page

### Issue: Buttons not working
**Solution**:
1. Check console for errors
2. Verify localStorage API is available
3. Test in non-private browsing mode

### Issue: Arabic text not RTL
**Solution**:
1. Verify `isRTL` is true when language is 'ar'
2. Check `dir={isRTL ? 'rtl' : 'ltr'}` prop is set
3. Verify `font-arabic` class is applied

### Issue: Popup appears every time
**Solution**:
1. Check localStorage is being set correctly
2. Verify domain hasn't changed (localStorage is domain-specific)
3. Check browser isn't blocking localStorage

---

**Version**: 1.0.0  
**Last Updated**: January 2025  
**Author**: BENTALBA ZAKARIA  
**Status**: ✅ Implemented & Deployed
