import { Close as CloseIcon } from "@mui/icons-material";
import {GeneralContext} from "./GeneralContext"
import { useContext } from "react";

const AnalysisModel = () => {
    const { analysisModalState, closeAnalysisModal } = useContext(GeneralContext);
    const { title, analysis, isLoading } = analysisModalState;

    return (
        <div className="modal-overlay" onClick={closeAnalysisModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">{title}</h2>
                    <button onClick={closeAnalysisModal} className="modal-close-btn"><CloseIcon /></button>
                </div>
                {isLoading ? (
                    <div className="loader-container">
                        <div className="spinner"></div>
                        <p>Generating AI Insights...</p>
                    </div>
                ) : (
                    <div className="analysis-content">
                        {analysis}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnalysisModel;