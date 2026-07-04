import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { FileText } from 'lucide-react';
import api from '../../utils/axios';

export const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      const res = await api.get('/audit');
      if (res.data.success) {
        setLogs(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch audit logs", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="flex flex-col h-full space-y-6">
      
      <div className="flex justify-between items-end">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Administration</p>
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Audit Logs</h1>
        </div>
      </div>

      <Card className="flex-1 flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center gap-2 text-gray-900 font-semibold">
            <FileText size={20} className="text-primary-DEFAULT" />
            <h3>System Activity</h3>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white sticky top-0 border-b border-gray-100 z-10">
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Performed By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr><td colSpan="4" className="py-8 text-center text-gray-500">Loading logs...</td></tr>
              ) : logs.length === 0 ? (
                <tr><td colSpan="4" className="py-8 text-center text-gray-500">No audit logs found.</td></tr>
              ) : (
                logs.map((log) => (
                  <tr key={log._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {new Date(log.date).toLocaleString()}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900">
                      {log.description}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {log.performedBy ? `${log.performedBy.firstName} ${log.performedBy.lastName}` : 'System'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
