import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Specials from './components/Specials';
import Testimonials from './components/Testimonials';
import BookingSection from './components/BookingSection';
import About from './components/About';
import Footer from './components/Footer';
import NotificationModal from './components/NotificationModal';

export default function App() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    message: '',
    actionLabel: '',
    onAction: null,
  });

  const handleNavigate = (href) => {
    if (href.startsWith('#')) {
      const targetId = href.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    if (href === '#order-online') {
      handleOrderOnlineClick();
    } else if (href === '#login') {
      setModalState({
        isOpen: true,
        title: 'Customer Portal',
        message:
          'Customer logins, saved reservations, and reward points tracking are coming soon! You can reserve your table right now below.',
        actionLabel: 'Reserve Table Now',
        onAction: handleReserveClick,
      });
    }
  };

  const handleReserveClick = () => {
    const el = document.getElementById('reservations');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      const firstInput = el.querySelector('input, select, button');
      if (firstInput) {
        firstInput.focus();
      }
    }
  };

  const handleOrderOnlineClick = () => {
    setModalState({
      isOpen: true,
      title: 'Online Ordering',
      message:
        'Online ordering and express delivery are currently preparing to launch for our Chicago patrons. You can reserve your dining table online anytime!',
      actionLabel: 'Reserve Table',
      onAction: handleReserveClick,
    });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <>
      <Header onNavigate={handleNavigate} />
      <main id="main-content">
        <Hero onReserveClick={handleReserveClick} />
        <Specials onOrderOnlineClick={handleOrderOnlineClick} />
        <Testimonials />
        <BookingSection />
        <About />
      </main>
      <Footer onNavigate={handleNavigate} />

      <NotificationModal
        isOpen={modalState.isOpen}
        title={modalState.title}
        message={modalState.message}
        actionLabel={modalState.actionLabel}
        onAction={modalState.onAction}
        onClose={closeModal}
      />
    </>
  );
}
