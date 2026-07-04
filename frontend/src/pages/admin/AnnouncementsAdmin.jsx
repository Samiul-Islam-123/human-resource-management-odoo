import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Plus, Trash2 } from 'lucide-react';
import api from '../../utils/axios';

export const AnnouncementsAdmin = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ title: '', desc: '', color: 'bg-primary-100 text-primary-600' });

  const fetchAnnouncements = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/announcements');
      if (res.data.success) {
        setAnnouncements(res.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('/announcements', formData);
      setIsModalOpen(false);
      setFormData({ title: '', desc: '', color: 'bg-primary-100 text-primary-600' });
      fetchAnnouncements();
    } catch (error) {
      alert('Failed to post announcement');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this announcement?')) return;
    try {
      await api.delete(`/announcements/${id}`);
      fetchAnnouncements();
    } catch (error) {
      alert('Failed to delete announcement');
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Announcements</h1>
          <p className="text-gray-500 mt-1">Manage company-wide announcements</p>
        </div>
        <Button variant="primary" className="gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> New Announcement
        </Button>
      </div>

      <Card className="flex-1 p-6 border-none shadow-sm overflow-hidden flex flex-col">
        {isLoading ? (
          <p className="text-gray-500 text-center py-10">Loading...</p>
        ) : (
          <div className="flex-1 overflow-auto space-y-4">
            {announcements.length === 0 ? (
              <p className="text-gray-500 text-center py-10">No announcements found.</p>
            ) : (
              announcements.map((a) => (
                <div key={a._id} className="border border-gray-100 p-4 rounded-xl flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex-shrink-0 ${a.color}`}></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-gray-900">{a.title}</h4>
                      <button onClick={() => handleDelete(a._id)} className="text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{a.desc}</p>
                    <p className="text-xs text-gray-400 mt-2 font-medium tracking-wider uppercase">
                      By {a.author} • {new Date(a.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </Card>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Post Announcement</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input required type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea required rows="4" className="w-full px-3 py-2 border border-gray-200 rounded-lg resize-none" value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})}></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Theme Color</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})}>
                  <option value="bg-primary-100 text-primary-600">Purple</option>
                  <option value="bg-green-100 text-green-600">Green</option>
                  <option value="bg-blue-100 text-blue-600">Blue</option>
                  <option value="bg-red-100 text-red-600">Red</option>
                  <option value="bg-orange-100 text-orange-600">Orange</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="secondary" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>Post</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
