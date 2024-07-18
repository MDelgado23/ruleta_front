'use client'

import React, { useEffect, useState } from 'react';
import { getBets } from '../../../services/betService';
import { Bet } from '../../../types/bet';
import { jsPDF } from 'jspdf';

const BetList: React.FC = () => {
  const [bets, setBets] = useState<Bet[]>([]);

  useEffect(() => {
    const fetchBets = async () => {
      try {
        const betsData = await getBets();
        setBets(betsData);
      } catch (error) {
        console.error('Error fetching bets:', error);
      }
    };

    fetchBets();
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();
    let yPosition = 10;

    doc.text('All Bets Report', 10, yPosition);
    yPosition += 10;

    bets.forEach((bet) => {
      doc.text(`User: ${bet.user.username}, Prize: ${bet.prize.name}, Amount: ${bet.amount}, Date: ${new Date(bet.createdAt).toLocaleString()}`, 10, yPosition);
      yPosition += 10;
    });

    doc.save('bets_report.pdf');
  };

  return (
    <div>
      <h2>All Bets</h2>
      <button onClick={downloadPDF}>Download PDF</button>
      <ul>
        {bets.map((bet) => (
          <li key={bet.id}>
            User: {bet.user.username}, Prize: {bet.prize.name}, Amount: {bet.amount}, Date: {new Date(bet.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BetList;
