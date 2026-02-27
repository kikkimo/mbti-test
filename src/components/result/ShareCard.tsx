import { motion } from 'framer-motion';
import { useState } from 'react';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';

interface ShareCardProps {
  shareId: string;
  onExportPDF: () => void;
  onExportImage: () => void;
}

export default function ShareCard({ shareId, onExportPDF, onExportImage }: ShareCardProps) {
  const [showModal, setShowModal] = useState(false);
  const shareUrl = `${window.location.origin}/share/${shareId}`;

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setShowModal(true);
  };

  return (
    <>
      <motion.div
        className="bg-white rounded-2xl shadow-xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="text-xl font-semibold mb-6">分享与导出</h3>
        <div className="space-y-4">
          <Button onClick={copyLink} variant="outline" className="w-full">
            复制分享链接
          </Button>
          <Button onClick={onExportPDF} variant="outline" className="w-full">
            导出 PDF
          </Button>
          <Button onClick={onExportImage} variant="outline" className="w-full">
            导出图片
          </Button>
        </div>
        <p className="text-sm text-gray-500 mt-4 text-center">
          分享链接有效期为 180 天
        </p>
      </motion.div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="text-center">
          <div className="text-6xl mb-4">✓</div>
          <h4 className="text-xl font-semibold mb-2">链接已复制</h4>
          <p className="text-gray-600 mb-4">分享链接已复制到剪贴板</p>
          <Button onClick={() => setShowModal(false)}>确定</Button>
        </div>
      </Modal>
    </>
  );
}
