clear all;

% fTimes = 'testTimes.json'; 
% fid = fopen(fTimes); 
% raw = fread(fid,inf); 
% str = char(raw'); 
% fclose(fid); 
% times = jsondecode(str);

% %fVals = ;  %testValsRawUnfiltered2NF,testValsRawFiltered2NF,
% fid = fopen('testVals.json');
% raw = fread(fid,inf); 
% fclose(fid);
% new = split(char(raw'), ",");
% x = str2double(reshape(new, 16, length(new)/16));

filenameFilt = 'testValsRawFiltered7Focus.json';
fid = fopen(filenameFilt);%3Focus
rawFilt = fread(fid,inf);
fclose(fid); 
newFilt = split(char(rawFilt'), ",")
xFilt = str2double(reshape(newFilt, 16, length(newFilt)/16));

filenameUFilt = 'testValsRawUnFiltered7Focus.json';
fid = fopen(filenameUFilt);%3Focus
rawUFilt = fread(fid,inf); 
fclose(fid); 
newUFilt = split(char(rawUFilt'), ",")
xUFilt = str2double(reshape(newUFilt, 16, length(newUFilt)/16));




bounds = min(length(xUFilt), length(xFilt));

actualValsFilt = [];
actualValsUFilt = [];

for i = 1:bounds/8
    actualValsFilt = [actualValsFilt; xFilt(:, 8*(i-1)+1:8*i)];
    actualValsUFilt = [actualValsUFilt; xUFilt(:, 8*(i-1)+1:8*i)];
end



freq = 256;
times = 1/freq:1/freq:length(actualValsFilt)/freq; % in secs
channels = ["CP3", "C3", 'F5', 'PO3', 'PO4', 'F6', 'C4', 'CP4']


%save 'NFocus7.mat' actualValsFilt actualValsUFilt times freq channels

figure(16)
t = tiledlayout(8,1,'TileSpacing','none','Padding','Compact');

for i =1:8
    subplot(8,1,i);
    datatoplot = actualValsFilt(:,i);
    plot(times, datatoplot)
    ylabel(channels(i))
end

sgtitle("Raw Filtered")


figure(17)
t = tiledlayout(8,1,'TileSpacing','none','Padding','Compact');
for i =1:8
    subplot(8,1,i);
    datatoplot = actualValsUFilt(:,i);
    plot(times, datatoplot)
    ylabel(channels(i))
end
sgtitle("Raw Unfiltered")

figure (18)
t = tiledlayout(2,1,'TileSpacing','none','Padding','Compact');

subplot(2,1,1);
title("Unfiltered")
plot(times, actualValsUFilt(:,1))

subplot(2,1,2);
title("Filtered")
plot(times, actualValsFilt(:,1))
