import { useState } from 'react';
import { useMutation } from 'react-query';
import { submitContactForm } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const mutation = useMutation(submitContactForm, {
    onSuccess: () => {
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    },
    onError: () => {
      alert('Failed to send message. Please try again.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="section-container py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="heading-2 text-center mb-12">Contact Us</h1>

        <form onSubmit={handleSubmit} className="card space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Name *</label>
            <input
              type="text"
              required
              className="input-field"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email *</label>
            <input
              type="email"
              required
              className="input-field"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input
              type="tel"
              className="input-field"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Subject</label>
            <input
              type="text"
              className="input-field"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Message *</label>
            <textarea
              required
              rows={6}
              className="input-field"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={mutation.isLoading}
            className="btn-primary w-full"
          >
            {mutation.isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;

