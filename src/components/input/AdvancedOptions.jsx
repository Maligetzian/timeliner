import React, { useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';

const AdvancedOptions = ({ showOptions, setShowOptions, spaceProportionally, setSpaceProportionally, vertical, setVertical, allowBothSides, setAllowBothSides }) => {
    const optionsRef = useRef(null);
    const buttonText = showOptions ? 'Hide Advanced Options ▼' : 'Show Advanced Options ▶';

    useLayoutEffect(() => {
        const optionsElement = optionsRef.current;
        if (showOptions) {
            optionsElement.style.maxHeight = `${optionsElement.scrollHeight}px`;
        } else {
            optionsElement.style.maxHeight = '0';
        }
    }, [showOptions]);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4 w-full max-w-3xl">
            <div className="flex items-center mb-4">
                <button
                    type="button"
                    className="text-blue-500 hover:text-blue-700 font-bold text-left"
                    onClick={() => setShowOptions(!showOptions)}
                >
                    {buttonText}
                </button>
            </div>
            <div
                ref={optionsRef}
                className="overflow-hidden transition-max-height duration-500 ease-in-out"
                style={{ maxHeight: showOptions ? `${optionsRef.current?.scrollHeight}px` : '0' }}
            >
                <div className="border p-4 rounded-md">
                    <div className="flex flex-col space-y-2">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={spaceProportionally}
                                onChange={(e) => setSpaceProportionally(e.target.checked)}
                                className="mr-2"
                            />
                            Space Proportionally
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={vertical}
                                onChange={(e) => setVertical(e.target.checked)}
                                className="mr-2"
                            />
                            Vertical
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={allowBothSides}
                                onChange={(e) => setAllowBothSides(e.target.checked)}
                                className="mr-2"
                            />
                            Allow Data on Both Sides of the Timeline
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

AdvancedOptions.propTypes = {
    showOptions: PropTypes.bool.isRequired,
    setShowOptions: PropTypes.func.isRequired,
    spaceProportionally: PropTypes.bool.isRequired,
    setSpaceProportionally: PropTypes.func.isRequired,
    vertical: PropTypes.bool.isRequired,
    setVertical: PropTypes.func.isRequired,
    allowBothSides: PropTypes.bool.isRequired,
    setAllowBothSides: PropTypes.func.isRequired,
};

export default AdvancedOptions;
