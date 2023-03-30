import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StepDetail from './detail';

// const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

const  DemoSteps = (props) => {
  const {field,onSubmit} = props;
  const {style, size, className, name, label, options, placeholder, value,children,showStepsTitle} = field;


  const [steps, setSteps] = React.useState(children);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  console.log('fieldfield',field)
  const isStepOptional = (step) => {
    return step === 1;
  };
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  const handleNext = () => {
    // let newSkipped = skipped;
    // if (isStepSkipped(activeStep)) {
    //   newSkipped = new Set(newSkipped.values());
    //   newSkipped.delete(activeStep);
    // }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // setSkipped(newSkipped);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };
  const handleReset = () => {
    setActiveStep(0);
  };
  // const handleNextRadio = ()=>{
  //   // setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   console.log('zeeeeeeeeeeeeeeeeeeert')
  // }
  const handleNextRadio = React.useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }, [])
  return (
    <Box
      sm={size ? size.sm : ''}
      lg={size ? size.lg : ''}
      className={'MGD ' + (className !== undefined ? className : '')}
      style={style}
    >

    {
      showStepsTitle && (
          <Stepper activeStep={activeStep}>
                  {steps.map((step, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    // if (isStepOptional(index)) {
                    //   labelProps.optional = (
                    //     <Typography variant="caption">Optional</Typography>
                    //   );
                    // }
                    if (isStepSkipped(index)) {
                      stepProps.completed = false;
                    }
                    return (
                      <Step key={index} {...stepProps}>
                        <StepLabel {...labelProps}>
                          &nbsp;&nbsp;{step.settings.general.fields.title}
                          </StepLabel>
                      </Step>
                    );
                  })}
          </Stepper>
      )
    }



      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
            <Button type="submit" onClick={onSubmit}>Submit</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>




          <StepDetail content={children} activeStep={activeStep} nextStep={handleNextRadio} />







          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            {/* <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button> */}
              {
                activeStep === steps.length - 1 ?(
                  <Button   onClick={handleNext} >
                  {/* <Button type="submit" onClick={onSubmit}> */}
                      Finish
                  </Button>
                ):(
                  <Button  onClick={handleNext}>
                      Next
                </Button>
                )
              }


          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
export default DemoSteps;
